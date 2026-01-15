import Observer from "@cocreate/observer";

// --- CONFIGURATION ---
// SECURITY: STRICT ALLOWLIST
const plugins = {
    Toastify: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/toastify-js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"]
    },
    Choices: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css"]
    },
    flatpickr: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/flatpickr", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"]
    },
    Quill: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.min.js", crossOrigin: "anonymous" }],
        css: [
            "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.core.css",
            "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css",
            "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.bubble.css"
        ]
    },
    ClassicEditor: {
        js: [{ src: "https://cdn.ckeditor.com/ckeditor5/41.2.0/classic/ckeditor.js", crossOrigin: "anonymous" }]
    },
    Dropzone: {
        js: [{ src: "https://unpkg.com/dropzone@5/dist/min/dropzone.min.js", crossOrigin: "anonymous" }],
        css: ["https://unpkg.com/dropzone@5/dist/min/dropzone.min.css"]
    },
    SimpleBar: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.css"]
    },
    GLightbox: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css"]
    },
    FgEmojiPicker: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/fg-emoji-picker/fgEmojiPicker.js", crossOrigin: "anonymous" }]
    },
    bootstrap: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", crossOrigin: "anonymous" }]
    },
    Waves: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/node-waves/dist/waves.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/node-waves/dist/waves.min.css"]
    },
    feather: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js", crossOrigin: "anonymous" }]
    },
    ApexCharts: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/apexcharts", crossOrigin: "anonymous" }]
    },
    jsVectorMap: {
        js: [
            { src: "https://cdn.jsdelivr.net/npm/jsvectormap", crossOrigin: "anonymous" },
            { src: "https://cdn.jsdelivr.net/npm/jsvectormap/dist/maps/world.js", crossOrigin: "anonymous" }
        ],
        css: ["https://cdn.jsdelivr.net/npm/jsvectormap/dist/css/jsvectormap.min.css"]
    },
    Swiper: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"]
    },
    List: {
        js: [
            { src: "https://cdnjs.cloudflare.com/ajax/libs/list.js/2.3.1/list.min.js", crossOrigin: "anonymous" },
            { src: "https://cdnjs.cloudflare.com/ajax/libs/list.pagination.js/0.1.1/list.pagination.min.js", crossOrigin: "anonymous" }
        ]
    },
    Swal: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/sweetalert2@11", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css"]
    },
    FullCalendar: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js", crossOrigin: "anonymous" }]
    },
    Cleave: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/cleave.js/dist/cleave.min.js", crossOrigin: "anonymous" }]
    },
    noUiSlider: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/nouislider/dist/nouislider.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/nouislider/dist/nouislider.min.css"]
    },
    wNumb: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/wnumb/wNumb.min.js", crossOrigin: "anonymous" }]
    },
    Grid: {
        js: [
            { src: "https://unpkg.com/gridjs/dist/gridjs.umd.js", crossOrigin: "anonymous" },
            { src: "https://unpkg.com/gridjs/plugins/selection/dist/selection.umd.js", crossOrigin: "anonymous" }
        ],
        css: ["https://unpkg.com/gridjs/dist/theme/mermaid.min.css"]
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
    },
    Prism: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/prismjs/prism.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/prismjs/themes/prism.min.css"]
    },
    Isotope: {
        js: [{ src: "https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js", crossOrigin: "anonymous" }]
    },
    particlesJS: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js", crossOrigin: "anonymous" }]
    },
    dragula: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/dragula/dist/dragula.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/dragula/dist/dragula.min.css"]
    },
    DomAutoscroller: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/dom-autoscroller", crossOrigin: "anonymous" }]
    },
    Card: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/card/dist/card.js", crossOrigin: "anonymous" }]
    },
    Chart: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/chart.js", crossOrigin: "anonymous" }]
    },
    echarts: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js", crossOrigin: "anonymous" }]
    },
    Multi: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/multi.js/dist/multi.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/multi.js/dist/multi.min.css"]
    },
    autoComplete: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@10.2.7/dist/autoComplete.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@10.2.7/dist/css/autoComplete.01.min.css"]
    },
    Pickr: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/pickr.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/classic.min.css"]
    },
    Shepherd: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/shepherd.js/dist/js/shepherd.min.js", crossOrigin: "anonymous" }],
        css: ["https://cdn.jsdelivr.net/npm/shepherd.js/dist/css/shepherd.css"]
    },
    GMaps: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/gmaps/gmaps.min.js", crossOrigin: "anonymous" }]
    },
    L: {
        js: [{ src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", crossOrigin: "anonymous" }],
        css: ["https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"]
    },
    Masonry: {
        js: [{ src: "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js", crossOrigin: "anonymous" }]
    },
    Rater: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/rater-js/index.js", crossOrigin: "anonymous" }]
    },
    Anime: {
        js: [{ src: "https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js", crossOrigin: "anonymous" }]
    }
};

// --- CORE ENGINE ---

// Global Cache for script promises to prevent race conditions and duplicate loads
const scriptCache = new Map();
// Cache the CSS marker once on load
const cssMarker = typeof document !== 'undefined' ? document.querySelector('link[plugins]') : null;

/**
 * Global Initialization Function
 * Processes one or more elements to attach plugins.
 * @param {HTMLElement|NodeList|Array} elements - Element, or Collection of Elements
 */
export function init(elements) {
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

async function processPlugin(el) {
    const rawAttr = el.getAttribute("plugin");
    if (!rawAttr) return;

    const pluginNames = rawAttr.split(',').map(s => s.trim());
    
    for (const pluginName of pluginNames) {
        const pluginDef = plugins[pluginName];
        if (!pluginDef) continue;

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
        
        executeGenericPlugin(el, pluginName);
    }
}

function executeGenericPlugin(el, name) {
    const prefix = name.toLowerCase();
    const mainAttr = el.getAttribute(prefix);
    let rawData;

    try { 
        rawData = JSON.parse(mainAttr);
    } catch(e) {
        rawData = {}; 
    }

    // 1. Gather configuration from attributes
    if (rawData && typeof rawData === 'object' && !Array.isArray(rawData)) {
        Array.from(el.attributes).forEach(attr => {
            if (!attr.name.startsWith(prefix + '-')) return;
            let key = attr.name.substring(prefix.length + 1);
            if (key.startsWith('$')) key = key.substring(1);
            let val = attr.value;
            try { val = JSON.parse(val); } catch (e) { }
            rawData[key] = val;
        });
    }

    // 2. Resolve parameters (Token Resolver)
    const resolved = processParams(el, rawData);

    const Target = window[name] || window[prefix]; 
    if (!Target) {
        console.error(`Constructor for ${name} not found on window.`);
        return;
    }

    let instance;
    try {
        // 3. Determine if we call as a function (Anime) or as a Constructor (Swiper)
        if (typeof Target === 'function' && (!Target.prototype || name === 'Anime')) {
            instance = Target(resolved);
        } else {
            if (Array.isArray(resolved)) {
                instance = new Target(...resolved);
            } else {
                instance = new Target(resolved);
            }
        }
        console.log(`Initialized ${name}`);
    } catch (e) {
        console.error(`Error initializing ${name}:`, e);
    }
    if (instance) el[name] = instance;
}

/**
 * Generic Parameter Processor
 * Handles: 
 * - $this / $this.children
 * - $window.path.to.function(arg)
 * - $anime.stagger(100)
 */
function processParams(el, params) {
    if (typeof params === 'string' && params.startsWith('$')) {
        try {
            // 1. Check for Method Call: $root.path.to.func(arg)
            const callMatch = params.match(/^\$([^.]+)\.(.+)\((.*)\)$/);
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
            const propMatch = params.match(/^\$([^.]+)(?:\.(.+))?$/);
            if (propMatch) {
                const [_, root, path] = propMatch;
                const obj = (root === 'this') ? el : window[root];
                if (!obj) return params; // Return raw string if root not found
                if (!path) return obj;
                
                const val = path.split('.').reduce((o, k) => (o || {})[k], obj);
                // Convert HTMLCollections to Arrays
                return (val instanceof HTMLCollection) ? Array.from(val) : val;
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

// Auto-init for existing elements
if (typeof document !== 'undefined') {
    init(document.querySelectorAll("[plugin]"));
}