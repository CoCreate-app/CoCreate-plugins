import Observer from "@cocreate/observer";
import {dotNotationToObject} from "@cocreate/utils";

/**
 * @typedef {Object} PluginDefinition
 * @property {Array<string|Object>} [js] - List of JS files to load. Can be strings (URLs) or objects with src, integrity, etc.
 * @property {Array<string>} [css] - List of CSS files to load.
 */

// --- CONFIGURATION ---

/**
 * @type {Object.<string, PluginDefinition>}
 * Configuration object containing plugin definitions.
 * Populated dynamically from CoCreate.config.js or defaults.
 */
const plugins = {};

// --- CORE ENGINE ---

/**
 * Global Cache for script promises to prevent race conditions and duplicate loads.
 * Stores the pending Promise for a script source URL.
 * @type {Map<string, Promise<void>>}
 */
const scriptCache = new Map();

/**
 * Cache the CSS marker once on load to determine injection point.
 * Used to ensure plugin CSS is injected in the correct order relative to user styles.
 * @type {Element|null}
 */
const cssMarker = typeof document !== 'undefined' ? document.querySelector('link[plugins]') : null;

/**
 * Global Initialization Function.
 * Processes one or more elements to detect and attach plugins.
 * * @param {HTMLElement|NodeList|Array<HTMLElement>} elements - Single Element, NodeList, or Array of Elements to initialize.
 * @returns {void}
 */
 function init(elements) {
    if (!elements) return;

    let collection = [];
    if (elements instanceof HTMLElement || elements instanceof Element) {
        collection = [elements];
    } else if (elements.length !== undefined && typeof elements !== 'function') {
        collection = Array.from(elements);
    } else {
        collection = [elements];
    }

    collection.forEach(el => {
        if (el && typeof el.getAttribute === 'function') {
            processPlugin(el);
        }
    });
}

/**
 * Processes an individual element to detect, load resources for, and execute plugins.
 * Reads the 'plugin' attribute (e.g., plugin="chart, map") to identify targets.
 * * @async
 * @param {HTMLElement} el - The DOM element to process.
 * @returns {Promise<void>} Resolves when all resources for the plugins are loaded.
 */
async function processPlugin(el) {
    const rawAttr = el.getAttribute("plugin");
    if (!rawAttr) return;

    const pluginNames = rawAttr.split(',').map(s => s.trim());
    
    for (const pluginName of pluginNames) {
        const pluginDef = plugins[pluginName];
        
        // Only attempt to load resources if a configuration exists
        if (pluginDef) {
            // Load CSS
            if (pluginDef.css) pluginDef.css.forEach(href => {
                if (!document.querySelector(`link[href="${href}"]`)) {
                    const link = document.createElement("link");
                    link.rel = "stylesheet"; 
                    link.href = href;
                    
                    // CSS INJECTION STRATEGY:
                    // 1. Priority: Check for a specific marker element <link plugin> 
                    //    (Cached globally in cssMarker)
                    
                    if (cssMarker) {
                        // Insert before the marker
                        cssMarker.parentNode.insertBefore(link, cssMarker);
                    } else {
                        // 2. Fallback: Prepend before existing CSS
                        // To allow custom CSS to easily override plugin defaults, we must ensure 
                        // plugin CSS loads BEFORE user CSS.
                        const firstStyle = document.head.querySelector('link[rel="stylesheet"], style');
                        
                        if (firstStyle) {
                            document.head.insertBefore(link, firstStyle);
                        } else {
                            // If no CSS exists yet, appending is safe
                            document.head.appendChild(link);
                        }
                    }
                }
            });

            // Load JS with Promise Cache
            if (pluginDef.js) {
                for (const item of pluginDef.js) {
                    const src = typeof item === 'string' ? item : item.src;
                    const integrity = typeof item === 'object' ? item.integrity : null;
                    const crossOrigin = typeof item === 'object' ? item.crossOrigin : null;

                    if (!scriptCache.has(src)) {
                        const scriptPromise = new Promise((resolve, reject) => {
                            // Check if already in DOM (manual load)
                            const existing = document.querySelector(`script[src="${src}"]`);
                            if (existing) {
                                if (existing.dataset.loaded === "true") {
                                    resolve();
                                } else {
                                    const prevOnload = existing.onload;
                                    existing.onload = () => {
                                        if (prevOnload) prevOnload();
                                        existing.dataset.loaded = "true";
                                        resolve();
                                    };
                                    existing.onerror = reject;
                                }
                            } else {
                                const s = document.createElement("script");
                                s.src = src;
                                if (integrity) {
                                    s.integrity = integrity;
                                    s.crossOrigin = crossOrigin || "anonymous";
                                }
                                s.onload = () => {
                                    s.dataset.loaded = "true";
                                    resolve();
                                };
                                s.onerror = reject;
                                document.head.appendChild(s);
                            }
                        });
                        scriptCache.set(src, scriptPromise);
                    }

                    try {
                        await scriptCache.get(src);
                    } catch (e) {
                        console.error(`Failed to load script: ${src}`, e);
                    }
                }
            }
        }
        
        // Attempt to execute plugin even if no config was found (it might be on window already)
        executeGenericPlugin(el, pluginName);
    }
}

/**
 * Helper to determine if a function should be called with 'new'.
 * Uses heuristics like ES6 class syntax, lack of prototype (arrow function), or PascalCase naming.
 * * @param {Function} func - The function to check.
 * @param {string} [name] - The property name associated with the function (for casing check).
 * @returns {boolean} True if the function appears to be a constructor.
 */
const isConstructor = (func, name) => {
    try {
        if (typeof func !== 'function') return false;
        if (/^\s*class\s+/.test(func.toString())) return true;
        if (!func.prototype) return false;
        const n = name || func.name;
        if (n && /^[A-Z]/.test(n)) return true;
    } catch(e) {}
    return false;
};

/**
 * Executes the logic for a generic plugin on a specific element.
 * Handles:
 * 1. Resolving the target class/function from window.
 * 2. Initializing the base instance.
 * 3. Processing attribute paths and nested JSON objects to execute methods or set properties.
 * * @param {HTMLElement} el - The target element.
 * @param {string} name - The name of the plugin (case-insensitive identifier).
 * @returns {void}
 */
function executeGenericPlugin(el, name) {
    const prefix = name.toLowerCase();
    const mainAttr = el.getAttribute(prefix);
    let rawData = {};

    for (let attr of el.attributes) {
        let key = attr.name;
        if (key === prefix) {
            key = name;
        } else if (key.startsWith(prefix + '-')) {
            key = key.replaceAll("-", ".");    
        } else continue

        try { 
            rawData[key] = JSON.parse(attr.value);
        } catch(e) {
            rawData[key] = attr.value; 
        }   

    };

    // 2. Resolve parameters (Token Resolver)
    let resolved = processParams(el, rawData);
    resolved = dotNotationToObject(resolved);

    let Plugin = window[name] || window[prefix]; 
    if (!Plugin) {
        console.error(`Plugin for ${name} not found on window.`);
        return;
    }

    // Iterate over resolved object. 
    // Since we use dotNotationToObject, keys like "swiper.effect" are already nested as { swiper: { effect: ... } }
    for (let key in resolved) {
        // We generally expect the root key to match the plugin name (e.g., 'swiper')
        // We unwrap this root key to pass the actual config to the Plugin.
        if (key === name || key.toLowerCase() === prefix) {
            try {
                // Determine Target: Use existing instance on element if available, else use Window Plugin
                let Target = el[name] || Plugin;
                let val = resolved[key];
                
                // Pass context: Window as parent, Plugin Name as property (for potential context binding)
                // el and name used to store the result on the element.
                update(Target, val, window, name, el, name);

                console.log(`Processed ${name}`);
            } catch (e) {
                console.error(`Error processing ${name}:`, e);
            }
        }
    }
}

function update(Target, val, parent, property, elParent, elProperty) {
    // RESOLUTION: Handle case-insensitivity before processing targets.
    // If Target is missing, check parent for a property matching 'property' (case-insensitive).
    if (!Target && parent && property) {
        const lowerProp = String(property).toLowerCase();
        for (const key in parent) {
            if (key.toLowerCase() === lowerProp) {
                Target = parent[key];
                property = key;
                if (elProperty) elProperty = key; // Update element structure key to match real property
                break;
            }
        }
    }

    let instance;
    if (typeof Target === 'function') {
        if (!isConstructor(Target, property)) {
            // Call as a function (method or standalone)
            // Use 'parent' as context (this) if available to maintain class references
            if (parent) {
                if (Array.isArray(val)) {
                    instance = Target.apply(parent, val);
                } else {
                    instance = Target.call(parent, val);
                }
            } else {
                if (Array.isArray(val)) {
                    instance = Target(...val);
                } else {
                    instance = Target(val);
                }
            }
        } else {
            // Call as a Constructor
            if (Array.isArray(val)) {
                instance = new Target(...val);
            } else {
                instance = new Target(val);
            }
        }
        
        // Assign the result to the element structure
        if (elParent && elProperty) {
            elParent[elProperty] = instance;
        }

    } else if (typeof Target === 'object' && Target !== null && typeof val === 'object' && val !== null && !Array.isArray(val)) {
        // Prepare the next level of the element structure
        if (elParent && elProperty) {
            if (!elParent[elProperty]) {
                elParent[elProperty] = {};
            }
            const nextElParent = elParent[elProperty];
            
            for (let key in val) {
                update(Target[key], val[key], Target, key, nextElParent, key);
            }
        }
    } else if (parent && property) {
        // If it's not a function, we are setting a value on the plugin object
        parent[property] = val;
        
        // Map the value to the element structure
        if (elParent && elProperty) {
            elParent[elProperty] = val;
        }
        
        console.log(`Set plugin property ${property} to`, val);
    }
}

/**
 * Generic Parameter Processor
 * Handles: 
 * - $this / $this.children
 * - $window.path.to.function(arg)
 * - $anime.stagger(100)
 * - Global access: $document, $window, etc.
 */
function processParams(el, params) {
    if (typeof params === 'string' && params.startsWith('\u0024')) {
        try {
            // 1. Check for Method Call: $root.path.to.func(arg)
            const callMatch = params.match(/^\u0024([^.]+)\.(.+)\((.*)\)$/);
            if (callMatch) {
                const [_, root, path, arg] = callMatch;
                const obj = (root === 'this') ? el : window[root];
                
                // If root object exists, drill down
                if (obj) {
                    const func = path.split('.').reduce((o, k) => (o || {})[k], obj);
                    if (typeof func === 'function') {
                        // Parse argument if JSON-like, else string
                        const parsedArg = arg ? (function() { try { return JSON.parse(arg); } catch(e) { return arg; } })() : undefined;
                        return func(parsedArg);
                    }
                }
            }
            
            // 2. Check for Property Access: $root.path.to.prop or just $root
            const propMatch = params.match(/^\u0024([^.]+)(?:\.(.+))?$/);
            if (propMatch) {
                const [_, root, path] = propMatch;
                const obj = (root === 'this') ? el : window[root];
                
                if (obj) {
                    if (!path) return (obj instanceof HTMLCollection) ? Array.from(obj) : obj;
                    
                    const val = path.split('.').reduce((o, k) => (o || {})[k], obj);
                    // Convert HTMLCollections to Arrays
                    return (val instanceof HTMLCollection) ? Array.from(val) : val;
                }
            }

            // 3. Check for standalone globals like $document or $window
            const globalKey = params.substring(1);
            if (window[globalKey]) {
                return window[globalKey];
            }

        } catch (e) {
            console.warn("Failed to resolve dynamic token:", params);
        }
    }
    
    if (Array.isArray(params)) return params.map(p => processParams(el, p));
    if (typeof params === 'object' && params !== null) {
        const res = {};
        for (let k in params) res[k] = processParams(el, params[k]);
        return res;
    }
    return params;
}

// --- STARTUP LOGIC ---

if (typeof document !== 'undefined') {
    // Dynamic Import: Loads config if available, handles error if missing.
    // Works with 'npm start' (Bundlers) by creating a code-split chunk.
    import("./CoCreate.config.js")
        .then((Config) => {
            // LOGIC: Merge exports into plugins object
            if (Config.plugins) {
                Object.assign(plugins, Config.plugins);
            } 
            else if (Config.default) {
                if (Config.default.plugins) {
                    Object.assign(plugins, Config.default.plugins);
                } else {
                    Object.assign(plugins, Config.default);
                }
            }
        })
        .catch((err) => {
            // Optional: fail silently for optional config
        })
        .finally(() => {
            // Start Observer
            Observer.init({
                name: "plugin",
                types: ["addedNodes", "attributes"],
                selector: "[plugin]",
                attributeFilter: ["plugin"],
                callback: (mutation) => {
                    init(mutation.target);
                }
            });
            
            // Initial Init
            init(document.querySelectorAll("[plugin]"));
        });
}

export default { init, plugins }