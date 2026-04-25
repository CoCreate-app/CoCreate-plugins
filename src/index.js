import Observer from "@cocreate/observer";
import { processOperatorsAsync } from "@cocreate/utils";

/**
 * @typedef {Object} PluginDefinition
 * @property {Array<string|Object>} [js] - List of JS files to load.
 * @property {Array<string>} [css] - List of CSS files to load.
 */

// --- CONFIGURATION ---
const plugins = {};

// --- CORE ENGINE ---
const scriptCache = new Map();
const cssMarker = typeof document !== 'undefined' ? document.querySelector('link[plugins]') : null;

/**
 * Global Initialization Function.
 */
function init(elements) {
    if (!elements) return;
    let collection = (elements instanceof HTMLElement || elements instanceof Element) ? [elements] : Array.from(elements || []);
    collection.forEach(el => {
        if (el && typeof el.getAttribute === 'function') processPlugin(el);
    });
}

/**
 * Processes resources and executes attributes in strict DOM order.
 * The attribute list IS the script. We iterate once and execute everything in sequence.
 */
async function processPlugin(el) {
    const rawAttr = el.getAttribute("plugin");
    const pluginNames = rawAttr ? rawAttr.split(',').map(s => s.trim()) : [];
    
    // 1. RESOURCE PRE-LOADING
    for (const name of pluginNames) {
        const pluginDef = plugins[name];

        if (pluginDef && !window[name]) {
            if (pluginDef.css) pluginDef.css.forEach(href => {
                if (!document.querySelector(`link[href="${href}"]`)) {
                    const link = document.createElement("link");
                    link.rel = "stylesheet"; link.href = href;
                    if (cssMarker) cssMarker.parentNode.insertBefore(link, cssMarker);
                    else document.head.appendChild(link);
                }
            });

            if (pluginDef.js) {
                for (const item of pluginDef.js) {
                    const src = typeof item === 'string' ? item : item.src;
                    if (!src) continue;
                    if (!scriptCache.has(src)) {
                        const existingScript = document.querySelector(`script[src*="${src}"]`);
                        if (existingScript && (existingScript.dataset.loaded === "true" || window[name])) {
                            scriptCache.set(src, Promise.resolve());
                        } else {
                            const s = document.createElement("script");
                            s.src = src;
                            scriptCache.set(src, new Promise((resolve) => {
                                s.onload = () => { s.dataset.loaded = "true"; resolve(); };
                                s.onerror = () => resolve();
                                document.head.appendChild(s);
                            }));
                        }
                    }
                    await scriptCache.get(src);
                }
            }
        }
    }

    // 2. LINEAR ATTRIBUTE SCRIPT EXECUTION
    const attributes = Array.from(el.attributes);
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        const attrName = attr.name;
        const attrLower = attrName.toLowerCase();

        const isDirectThis = attrName.startsWith('$this.');
        let cleanAttrName = attrLower.replace("()", ""); // Remove parentheses for method matching
        if (isDirectThis) {
            cleanAttrName = attrLower.substring(6); // Strip '$this.' for plugin matching
        }

        // Router: Find if this matches a listed plugin
        const activePluginName = pluginNames.find(p => cleanAttrName === p.toLowerCase() || cleanAttrName.startsWith(p.toLowerCase() + '.'));

        if (!activePluginName && !isDirectThis) continue;

        try {
            let val = attr.value.trim();
            if (val === "") val = "true";

            // BOOTSTRAPPING (Initialize on First Sight via Operator Engine)
            let existingInstance = activePluginName && el[activePluginName];

            if (activePluginName && !existingInstance) {
                const initVal = (cleanAttrName === activePluginName.toLowerCase()) ? val : null;
                                
                // Temporarily expose the library to the element so processOperatorsAsync can find and execute it natively
                // Only attach the global library if the element does not already have an instance
                if (window[activePluginName] && (el[activePluginName] === undefined || el[activePluginName] === null)) {
                    el[activePluginName] = window[activePluginName];
                }

                // Determine initialization argument without aggressive auto-quoting.
                // Rules:
                // - If the attr value starts with '$' treat as an operator expression and pass through.
                // - If it starts with a quote, attempt JSON.parse; on success use $parse('<json>') so operator engine returns an object.
                // - Otherwise pass the raw string value (do not auto-wrap in quotes).
                let safeInit = null;
                if (initVal) {
                    if (initVal.startsWith('{"') || initVal.startsWith('["')) {
                        // Looks like JSON (starts with {" or ["), try to parse — on success use $parse('<json>')
                        try {
                            JSON.parse(initVal);
                            safeInit = `$parse('${initVal}')`;
                        } catch (e) {
                          console.log(`[Plugin System] Failed to parse JSON for initialization of ${activePluginName}:`, e);
                        }
                    } else {
                        safeInit = initVal;
                    }  
                }

                // Construct initialization string (e.g., $Toastify(arg) )
                let initExpr = safeInit ? ("$" + activePluginName + "(" + safeInit + ")") : ("$" + activePluginName + "()");

                // Await initialization from the operator engine. Provide $this binding
                // so the operator engine can resolve element-scoped references.
                const initResult = await processOperatorsAsync(el, initExpr);
                
                if (initResult !== undefined && initResult !== null && initResult !== "") {
                    // Overwrite the temporary library function with the returned instance
                    el[activePluginName] = initResult;
                    existingInstance = initResult;
                }

                // If this attribute was the base initializer, we're done processing it
                if (cleanAttrName === activePluginName.toLowerCase()) {
                    continue;
                }
            }

            // --- CASE-SENSITIVE PATH RESOLUTION ---
            // Reconstruct the attribute path with correct casing from the instance/element deeply
            let keyParts = attrName.split('.');
            let resolvedParts = [];
            let pointer = null;

            if (isDirectThis) {
                resolvedParts.push('$this');
                pointer = el;
            } else {
                resolvedParts.push(activePluginName);
                pointer = existingInstance || el; // Fallback to element if instance isn't populated
            }

            for (let j = 1; j < keyParts.length; j++) {
                let part = keyParts[j];
                let isMethod = part.endsWith('()');
                let cleanPart = part.replace('()', '');
                let matchedKey = part;

                if (pointer != null) {
                    if (pointer[cleanPart] !== undefined) {
                        matchedKey = part;
                    } else {
                        let lower = cleanPart.toLowerCase();
                        let realKey = null;

                        let currentObj = pointer;
                        while (currentObj) {
                            let props = Object.getOwnPropertyNames(currentObj);
                            let found = props.find(p => p.toLowerCase() === lower);
                            if (found) {
                                realKey = found;
                                break;
                            }
                            currentObj = Object.getPrototypeOf(currentObj);
                        }

                        if (realKey) {
                            matchedKey = isMethod ? realKey + '()' : realKey;
                        }
                    }
                    pointer = pointer[matchedKey.replace('()', '')];
                }
                resolvedParts.push(matchedKey);
            }
            
            let correctedAttrName = resolvedParts.join('.');

            // --- DECORATION & EXECUTION ---
            // Plugins must be prefixed with $ for the operator engine's property resolution
            let prefixedAttrName = correctedAttrName;
            if (activePluginName && !isDirectThis) {
                prefixedAttrName = "$" + correctedAttrName;
            }

            const isMethodCall = correctedAttrName.includes('(') || correctedAttrName.endsWith('()');
            let expression = "";

            if (isMethodCall) {
                expression = prefixedAttrName;
            } else {
                let safeValue = val;
                if (!val.includes('$') && isNaN(val) && val !== 'true' && val !== 'false' && val !== 'null') {
                    if (!val.startsWith("'") && !val.startsWith('"')) safeValue = `'${val}'`;
                }
                expression = `${prefixedAttrName} = ${safeValue}`;
            }

            // Execute using the existing processOperatorsAsync system.
            const result = await processOperatorsAsync(el, expression, [], null, [], new Map([["$this", el]]));

            // CAPTURE & ASSIGN: If the element still lacks the instance, save the result of the execution to the element
            if (activePluginName && !el[activePluginName] && result !== undefined && result !== null && result !== "") {
                el[activePluginName] = result;
            }

        } catch (e) {
            console.warn(`[Plugin System] Sequential Execution Error (${attrName}):`, e);
        }
    }

    // 3. FALLBACK BOOT
    for (const name of pluginNames) {
        if (!el[name]) {
            if (window[name]) {
                el[name] = window[name];
            }
            const initResult = await processOperatorsAsync(el, `$${name}()`, [], null, [], new Map([["$this", el]]));
            if (initResult !== undefined && initResult !== null && initResult !== "") {
                el[name] = initResult;
            }
        }
    }
}

// Global Startup
if (typeof document !== 'undefined') {
    const selector = "[plugin]";
    Observer.init({
        name: "plugin",
        types: ["addedNodes", "attributes"],
        selector: selector,
        attributeFilter: ["plugin"],
        callback: (mutation) => init(mutation.target)
    });

    import("./CoCreate.config.js")
        .then((Config) => {
            const data = Config.plugins || Config.default?.plugins || Config.default || {};
            Object.assign(plugins, data);
        })
        .catch(() => {})
        .finally(() => init(document.querySelectorAll(selector)));
}

export default { init, plugins };