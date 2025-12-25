import Observer from "@cocreate/observer";

// --- CONFIGURATION ---
// SECURITY: STRICT ALLOWLIST
const plugins = {
    Toastify: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/toastify-js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"]
        // attribute prefix: toastify-
    },
    Choices: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css"]
        // attribute prefix: choices-
    },
    flatpickr: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/flatpickr", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"]
        // attribute prefix: flatpickr-
    },
    Quill: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.min.js", crossOrigin: "anonymous" }],
        css: [
            "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.core.css",
            "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css",
            "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.bubble.css"
        ]
        // attribute prefix: quill-
    },
    ClassicEditor: {
        js: [{ src: "https://cdn.ckeditor.com/ckeditor5/41.2.0/classic/ckeditor.js", crossOrigin: "anonymous" }]
        // attribute prefix: classiceditor-
    },
    Dropzone: {
        js: [{ src: "https://unpkg.com/dropzone@5/dist/min/dropzone.min.js", crossOrigin: "anonymous" }],
        css: ["https://unpkg.com/dropzone@5/dist/min/dropzone.min.css"]
        // attribute prefix: dropzone-
    },
    SimpleBar: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.css"]
        // attribute prefix: simplebar-
    },
    GLightbox: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css"]
        // attribute prefix: glightbox-
    },
    FgEmojiPicker: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/fg-emoji-picker/fgEmojiPicker.js", crossOrigin: "anonymous" }]
        // attribute prefix: fgemojipicker-
    },
    bootstrap: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", crossOrigin: "anonymous" }]
        // attribute prefix: bootstrap-
    },
    Waves: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/node-waves/dist/waves.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/node-waves/dist/waves.min.css"]
        // attribute prefix: waves-
    },
    feather: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js", crossOrigin: "anonymous" }]
        // attribute prefix: feather-
    },
    ApexCharts: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/apexcharts", crossOrigin: "anonymous" }]
        // attribute prefix: apexcharts-
    },
    jsVectorMap: {
        js: [
            { src: "https://cdn.jsdelivr.net/npm/jsvectormap", crossOrigin: "anonymous" },
            { src: "https://cdn.jsdelivr.net/npm/jsvectormap/dist/maps/world.js", crossOrigin: "anonymous" }
        ],
        css: ["https://cdn.jsdelivr.net/npm/jsvectormap/dist/css/jsvectormap.min.css"]
        // attribute prefix: jsvectormap-
    },
    Swiper: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"]
        // attribute prefix: swiper-
    },
    List: {
        js: [
            { src: "https://cdnjs.cloudflare.com/ajax/libs/list.js/2.3.1/list.min.js", crossOrigin: "anonymous" },
            { src: "https://cdnjs.cloudflare.com/ajax/libs/list.pagination.js/0.1.1/list.pagination.min.js", crossOrigin: "anonymous" }
        ]
        // attribute prefix: list-
    },
    Swal: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/sweetalert2@11", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css"]
        // attribute prefix: swal-
    },
    FullCalendar: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js", crossOrigin: "anonymous" }]
        // attribute prefix: fullcalendar-
    },
    Cleave: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/cleave.js/dist/cleave.min.js", crossOrigin: "anonymous" }]
        // attribute prefix: cleave-
    },
    noUiSlider: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/nouislider/dist/nouislider.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/nouislider/dist/nouislider.min.css"]
        // attribute prefix: nouislider-
    },
    wNumb: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/wnumb/wNumb.min.js", crossOrigin: "anonymous" }]
        // attribute prefix: wnumb-
    },
    Grid: {
        js: [
            { src: "https://unpkg.com/gridjs/dist/gridjs.umd.js", crossOrigin: "anonymous" },
            { src: "https://unpkg.com/gridjs/plugins/selection/dist/selection.umd.js", crossOrigin: "anonymous" }
        ],
        css: ["https://unpkg.com/gridjs/dist/theme/mermaid.min.css"]
        // attribute prefix: grid-
    },
    FilePond: {
        js: [
            { src: "https://unpkg.com/filepond/dist/filepond.min.js", crossOrigin: "anonymous" },
            { src: "https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.js", crossOrigin: "anonymous" },
            { src: "https://unpkg.com/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.min.js", crossOrigin: "anonymous" },
            { src: "https://unpkg.com/filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.min.js", crossOrigin: "anonymous" },
            { src: "https://unpkg.com/filepond-plugin-file-encode/dist/filepond-plugin-file-encode.min.js", crossOrigin: "anonymous" }
        ],
        css: [
            "https://unpkg.com/filepond/dist/filepond.min.css",
            "https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"
        ]
        // attribute prefix: filepond-
    },
    Prism: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/prismjs/prism.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/prismjs/themes/prism.min.css"]
        // attribute prefix: prism-
    },
    Isotope: {
        js: [{ src: "https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js", crossOrigin: "anonymous" }]
        // attribute prefix: isotope-
    },
    particlesJS: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js", crossOrigin: "anonymous" }]
        // attribute prefix: particlesjs-
    },
    dragula: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/dragula/dist/dragula.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/dragula/dist/dragula.min.css"]
        // attribute prefix: dragula-
    },
    DomAutoscroller: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/dom-autoscroller", crossOrigin: "anonymous" }]
        // attribute prefix: domautoscroller-
    },
    Card: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/card/dist/card.js", crossOrigin: "anonymous" }]
        // attribute prefix: card-
    },
    Chart: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/chart.js", crossOrigin: "anonymous" }]
        // attribute prefix: chart-
    },
    echarts: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js", crossOrigin: "anonymous" }]
        // attribute prefix: echarts-
    },
    Multi: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/multi.js/dist/multi.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/multi.js/dist/multi.min.css"]
        // attribute prefix: multi-
    },
    autoComplete: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@10.2.7/dist/autoComplete.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@10.2.7/dist/css/autoComplete.01.min.css"]
        // attribute prefix: autocomplete-
    },
    Pickr: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/pickr.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/classic.min.css"]
        // attribute prefix: pickr-
    },
    Shepherd: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/shepherd.js/dist/js/shepherd.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/shepherd.js/dist/css/shepherd.css"]
        // attribute prefix: shepherd-
    },
    GMaps: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/gmaps/gmaps.min.js", crossOrigin: "anonymous" }]
        // attribute prefix: gmaps-
    },
    L: {
        js: [{ src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", crossOrigin: "anonymous" }],
        css: ["https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"]
        // attribute prefix: l-
    },
    Masonry: {
        js: [{ src: "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js", crossOrigin: "anonymous" }]
        // attribute prefix: masonry-
    },
    Rater: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/rater-js/index.js", crossOrigin: "anonymous" }]
        // attribute prefix: rater-
    }
};

// --- CORE ENGINE ---

/**
 * Global Initialization Function
 * Processes one or more elements to attach plugins.
 * @param {HTMLElement|NodeList|Array} elements - Element, or Collection of Elements
 */
export function init(elements) {
    if (!elements) return;

    // 1. Detect Type & Normalize to Array
    // Normalize string handling (removed), Element, NodeList, HTMLCollection, Array
    let collection = [];
    
    if (elements instanceof HTMLElement || elements instanceof Element) {
        collection = [elements];
    } else if (elements.length !== undefined && typeof elements !== 'function') {
        // Handle Array-like objects (NodeList, HTMLCollection, Array)
        collection = Array.from(elements);
    } else {
        // Fallback for single object that isn't element (unlikely given spec, but safe)
        collection = [elements];
    }

    // 2. Iterate and Process
    collection.forEach(el => {
        // Ensure valid element before processing
        if (el && typeof el.getAttribute === 'function') {
            processPlugin(el);
        }
    });
}

// Auto-Init on load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        init(document.querySelectorAll("[plugin]"));
    });
}

async function processPlugin(el) {
    const rawAttr = el.getAttribute("plugin");
    if (!rawAttr) return;

    const pluginName = rawAttr.split(',')[0].trim();
    
    // SECURITY CHECK:
    // Look up the definition in our hardcoded allowlist.
    const pluginDef = plugins[pluginName];

    if (pluginDef) {
            console.log(`[Plugin System] Loading ${pluginName}...`);

            // Load CSS
            if(pluginDef.css) pluginDef.css.forEach(href => {
                if (!document.querySelector(`link[href="${href}"]`)) {
                const link = document.createElement("link");
                link.rel="stylesheet"; link.href=href; document.head.appendChild(link);
                }
            });

            // Load JS with Integrity Checks
            if(pluginDef.js) {
                for(const item of pluginDef.js) {
                    const src = typeof item === 'string' ? item : item.src;
                    const integrity = typeof item === 'object' ? item.integrity : null;
                    const crossOrigin = typeof item === 'object' ? item.crossOrigin : null;

                    if (document.querySelector(`script[src="${src}"]`)) continue;

                    await new Promise((resolve, reject) => {
                        const s = document.createElement("script");
                        s.src = src;
                        if (integrity) {
                            s.integrity = integrity;
                            s.crossOrigin = crossOrigin || "anonymous";
                        }
                        s.onload = resolve;
                        s.onerror = reject;
                        document.head.appendChild(s);
                    });
                }
            }
            
            // Initialize after load
            executeGenericPlugin(el, pluginName);

    } else {
        console.warn(`[Plugin System] Blocked: Plugin "${pluginName}" is not in the allowlist.`);
    }
}

async function executeGenericPlugin(el, pluginName) {
    // MODIFIED: Removed 'data-' prefix. 
    // Now looks for attributes like `quill=""` and `quill-theme=""`.
    const prefix = pluginName.toLowerCase();
    const mainAttr = el.getAttribute(prefix);

    // 1. CONFIG GATHERING
    const config = {};
    const attributes = Array.from(el.attributes); 
    
    attributes.forEach(attr => {
        if (!attr.name.startsWith(prefix + '-')) return;
        const key = attr.name.substring(prefix.length + 1);
        
        if (key.startsWith('$')) return;

        let val = attr.value;
        try { val = JSON.parse(val); } catch(e) {}

        if (key.includes('-')) {
            const parts = key.split('-');
            let target = config;
            for(let i=0; i<parts.length-1; i++) {
                if (!target[parts[i]]) target[parts[i]] = {};
                target = target[parts[i]];
            }
            target[parts[parts.length-1]] = val;
        } else {
            config[key] = val;
        }
    });

    // 2. INSTANTIATION
    const Constructor = window[pluginName];
    
    if (!Constructor) {
        console.error(`Constructor for ${pluginName} not found on window.`);
        return;
    }

    let instance = null;
    try {
        let args = [el, config]; 
        if (mainAttr) {
            try { 
                const json = JSON.parse(mainAttr);
                if (Array.isArray(json)) {
                    args = processParams(el, json, config, null, pluginName);
                }
            } catch(e) {}
        }
        instance = new Constructor(...args);
    } catch(e) {
        console.error(`Init failed for ${pluginName}`, e);
        return;
    }

    if (instance) el[pluginName] = instance;
    else return;

    // 3. OPERATOR PIPELINE
    const opPipeline = [];
    attributes.forEach(attr => {
        if (!attr.name.startsWith(prefix + '-')) return;
        let key = attr.name.substring(prefix.length + 1);
        if (!key.startsWith('$')) return;
        let val = attr.value;
        try { val = JSON.parse(val); } catch(e) {}
        let opName = key; 
        opPipeline.push(opName, [val]);
    });

    if (opPipeline.length > 0) {
        await executePipeline(el, opPipeline, pluginName, instance, config);
    }
}

async function executePipeline(element, pipelineArray, pluginName, currentCtx, config = {}) {
    let parentCtx = window;
    const instance = element[pluginName] || currentCtx; 

    for (let i = 0; i < pipelineArray.length; i++) {
        const item = pipelineArray[i];
        if (Array.isArray(item)) continue;

        if (typeof item === 'string') {
            let opName = item;

            if ((typeof currentCtx === 'undefined' || currentCtx === null) && instance) {
                currentCtx = instance;
            }

            if (opName.toLowerCase() === '$this') {
                const args = (i + 1 < pipelineArray.length && Array.isArray(pipelineArray[i + 1])) ? pipelineArray[i + 1] : [];
                const mapDef = args[0]; 
                if (Array.isArray(mapDef)) {
                    mapDef.forEach(def => {
                        applyMapping(element, instance, def);
                    });
                }
                continue;
            }

            if (opName.startsWith('$')) {
                if (!currentCtx) {
                        if (element[pluginName]) currentCtx = element[pluginName];
                        if (!currentCtx) {
                        console.warn(`Context undefined for operator ${opName}. Skipping.`);
                        continue;
                        }
                }

                let cleanName = opName.substring(1); 
                if (!cleanName.includes('.')) {
                        cleanName = cleanName.replace(/-/g, '');
                }

                let realKey = cleanName;
                if (!cleanName.includes('.') && currentCtx && (typeof currentCtx === 'object' || typeof currentCtx === 'function')) {
                    try {
                        const keys = Object.keys(currentCtx.constructor?.prototype || currentCtx); 
                        const found = keys.find(k => k.toLowerCase() === cleanName.toLowerCase());
                        if (found) realKey = found;
                        else {
                                const directFound = Object.keys(currentCtx).find(k => k.toLowerCase() === cleanName.toLowerCase());
                                if(directFound) realKey = directFound;
                        }
                    } catch (e) {}
                }
                opName = realKey;
            }

            const [parent, val] = resolvePath(i === 0 ? window : currentCtx, opName);
            
            if (typeof val === 'undefined') {
                console.warn(`Method/Prop "${opName}" not found on context.`);
                continue;
            }

            parentCtx = parent;
            currentCtx = val;

            if (typeof currentCtx === 'function') {
                let args = [];
                if (i + 1 < pipelineArray.length && Array.isArray(pipelineArray[i + 1])) {
                    args = processParams(element, pipelineArray[i + 1], config, instance, pluginName);
                }

                try {
                    const finalArgs = (args.length === 1) ? [args[0]] : args; 
                    try {
                        currentCtx = await currentCtx.apply(parentCtx, finalArgs);
                    } catch (err) {
                        currentCtx = new currentCtx(...finalArgs);
                        parentCtx = currentCtx;
                    }
                } catch(e) {
                    console.error(`Exec error ${opName}`, e);
                }
            }
        }
    }
    return currentCtx;
}

// --- HELPERS ---
function applyMapping(element, instance, def) {
    if (def.includes('=')) {
        const [lhs, rhs] = def.split('=').map(s => s.trim());
        const pathRaw = rhs;
        const match = lhs.match(/^[$]?([\w\.]+)(\(\))?$/);
        if (!match) return; 
        const alias = match[1];
        const isFunction = match[2] === '()'; 
        
        if (isFunction) {
            element[alias] = function(val) {
                if (arguments.length > 0) return assignDeep(instance, pathRaw, val);
                else return resolveDeep(instance, pathRaw);
            };
        } else {
            Object.defineProperty(element, alias, {
                get: () => resolveDeep(instance, pathRaw),
                set: (v) => assignDeep(instance, pathRaw, v),
                configurable: true
            });
        }
    } else {
        if (typeof instance[def] === 'function') {
            element[def] = instance[def].bind(instance);
        }
    }
}

function processParams(element, params, config, instance, pluginName) {
    if (params === "$this") return element;
    if (params === "$config") return config;
    if (params === "$root" || params === "$instance") return instance;
    if (typeof params === 'string' && params === `$${pluginName}`) return instance;
    if (typeof params === 'string' && params.startsWith('$this.')) return resolveDeep(element, params.substring(6));
    if (Array.isArray(params)) return params.map(p => processParams(element, p, config, instance, pluginName));
    if (typeof params === 'object' && params !== null) {
        const res = {};
        for(let k in params) res[k] = processParams(element, params[k], config, instance, pluginName);
        return res;
    }
    return params;
}

function resolveDeep(obj, path) {
    if (!obj || !path) return undefined;
    return path.split('.').reduce((o, k) => (o || {})[k], obj);
}
function assignDeep(obj, path, val) {
    if (!obj || !path) return;
    const parts = path.split('.');
    let target = obj;
    for(let i=0; i<parts.length-1; i++) target = target[parts[i]];
    const last = parts[parts.length-1];
    if(typeof target[last] === 'function') target[last](val);
    else target[last] = val;
}
function resolvePath(obj, path) {
    if (!obj || !path) return [null, undefined];
    const parts = path.split('.');
    let current = obj;
    let parent = null;
    for (const part of parts) {
        if (!current) return [null, undefined];
        parent = current;
        current = current[part];
    }
    return [parent, current];
}

// --- OBSERVER INTEGRATION ---
Observer.init({
    name: "plugin",
    types: ["addedNodes", "attributes"],
    selector: "[plugin]",
    attributeFilter: ["plugin"],
    callback: (mutation) => {
        init(mutation.target);
    }
});