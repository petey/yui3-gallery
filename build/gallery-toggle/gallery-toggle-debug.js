YUI.add('gallery-toggle', function(Y) {

// START WRAPPER: The YUI.add wrapper is added by the build system, when you use YUI Builder to build your component from the raw source in this file
//YUI.add("gallery-toggle", function (Y) {

    /* Any frequently used shortcuts, strings and constants */
    var Node = Y.Node;

    /* Toggle class constructor */
    function Toggle(config) {
        Toggle.superclass.constructor.apply(this, arguments);
    }

    /* 
     * Required NAME static field, to identify the Widget class and 
     * used as an event prefix, to generate class names etc. (set to the 
     * class name in camel case). 
     */
    Toggle.NAME = "toggle";

    /*
     * The attribute configuration for the widget. This defines the core user facing state of the widget
     */
    Toggle.ATTRS = {
        label : {
            value : ""
        },
        on : {
            value : "On"
        },
        off : {
            value : "Off"
        },
        selected : {
            value : "on",
            validator : "_validateSelected",
            broadcast: 1
        },

        attrA : {
            value: "A"                     // The default value for attrA, used if the user does not set a value during construction.

            /*
            , valueFn: "_defAttrAVal"      // Can be used as a substitute for "value", when you need access to "this" to set the default value.
             
            , setter: "_setAttrA"          // Used to normalize attrA's value while during set. Refers to a prototype method, to make customization easier
            , getter: "_getAttrA"          // Used to normalize attrA's value while during get. Refers to a prototype method, to make customization easier
            , validator: "_validateAttrA"  // Used to validate attrA's value before updating it. Refers to a prototype method, to make customization easier

            , readOnly: true               // Cannot be set by the end user. Can be set by the component developer at any time, using _set
            , writeOnce: true              // Can only be set once by the end user (usually during construction). Can be set by the component developer at any time, using _set
            
            , lazyAdd: false               // Add (configure) the attribute during initialization. 
            
                                           // You only need to set lazyAdd to false if your attribute is
                                           // setting some other state in your setter which needs to be set during initialization 
                                           // (not generally recommended - the setter should be used for normalization. 
                                           // You should use listeners to update alternate state). 

            , broadcast: 1                 // Whether the attribute change event should be broadcast or not.
            */
        }
        
        // ... attrB, attrC, attrD ... attribute configurations. 

        // Can also include attributes for the super class if you want to override or add configuration parameters
    };

    /* 
     * The HTML_PARSER static constant is used if the Widget supports progressive enhancement, and is
     * used to populate the configuration for the Toggle instance from markup already on the page.
     */
    Toggle.HTML_PARSER = {

        selected: function (srcNode) {
            // If progressive enhancement is to be supported, return the value of "attrA" based on the contents of the srcNode
            var def = "on";
            if (Y.one('.yui3-toggle a.yui3-last')) {
              def = Y.one('.yui3-toggle a.yui3-last').hasClass('yui3-selected') ? "off" : "on";  
            }
            return def;
        }

    };

    /* Templates for any markup the widget uses. Usually includes {} tokens, which are replaced through Y.substitute */
    Toggle.LABEL_TEMPLATE = '<span class="yui3-label">{label}</span>';
    Toggle.TOGGLE_TEMPLATE = '{label}<a class="yui3-first" href="#on">{on}</a><a class="yui3-last" href="#off">{off}</a>';

    /* Toggle extends the base Widget class */
    Y.extend(Toggle, Y.Widget, {

        initializer: function () {
            /*
             * initializer is part of the lifecycle introduced by 
             * the Base class. It is invoked during construction,
             * and can be used to setup instance specific state or publish events which
             * require special configuration (if they don't need custom configuration, 
             * events are published lazily only if there are subscribers).
             *
             * It does not need to invoke the superclass initializer. 
             * init() will call initializer() for all classes in the hierarchy.
             */
        },

        destructor : function () {
            /*
             * destructor is part of the lifecycle introduced by 
             * the Widget class. It is invoked during destruction,
             * and can be used to cleanup instance specific state.
             *
             * Anything under the boundingBox will be cleaned up by the Widget base class
             * We only need to clean up nodes/events attached outside of the bounding Box
             *
             * It does not need to invoke the superclass destructor. 
             * destroy() will call initializer() for all classes in the hierarchy.
             */
        },

        renderUI : function () {
            /*
             * renderUI is part of the lifecycle introduced by the
             * Widget class. Widget's renderer method invokes:
             *
             *     renderUI()
             *     bindUI()
             *     syncUI()
             *
             * renderUI is intended to be used by the Widget subclass
             * to create or insert new elements into the DOM. 
             */
            var label = "",
                myNode;
            if (!this.get('srcNode').one('.yui3-toggle')) {
                if (this.get('label')) {
                    label = Y.substitute(Toggle.LABEL_TEMPLATE, { label: this.get('label') });
                }
  
                myNode = Node.create(Y.substitute(Toggle.TOGGLE_TEMPLATE, {
                    mynodeid: this.get("id") + "_toggle",
                    label: label,
                    on: this.get('on'),
                    off: this.get('off')
                }));
              
                this.get('srcNode').append(myNode);
            }
        },

        bindUI : function () {
            /*
             * bindUI is intended to be used by the Widget subclass 
             * to bind any event listeners which will drive the Widget UI.
             * 
             * It will generally bind event listeners for attribute change
             * events, to update the state of the rendered UI in response 
             * to attribute value changes, and also attach any DOM events,
             * to activate the UI.
             */
            
            Y.on('click', this._onToggleClick, '.yui3-toggle a', this);
        },

        syncUI : function () {
            /*
             * syncUI is intended to be used by the Widget subclass to
             * update the UI to reflect the initial state of the widget,
             * after renderUI. From there, the event listeners we bound above
             * will take over.
             */
            this._uiSetSelected(this.get("selected"));
        },

        // Beyond this point is the Toggle specific application and rendering logic

        /* Attribute state supporting methods (see attribute config above) */
        _validateSelected : function (val) {
            return val === "on" || val === "off";
        },

        /* Listeners, UI update methods */
        _onToggleClick : function (e) {
            e.preventDefault();
            if (!e.target.hasClass('selected')) {
                this.set('selected', e.target.hasClass('yui3-first') ? "on" : "off");
                this._uiSetSelected(this.get('selected'));
            }
        },
        _uiSetSelected : function (selected) {
            Y.one('.yui3-toggle').all('a').removeClass('yui3-selected');
            if (selected === "on") {
                Y.one('.yui3-toggle .yui3-first').addClass('yui3-selected');
            } else {
                Y.one('.yui3-toggle .yui3-last').addClass('yui3-selected');
            }
        }
    });

    Y.Toggle = Toggle;

//}, "3.1.0", {requires: ["widget", "substitute"]});
// END WRAPPER


}, '@VERSION@' ,{requires:['widget','substitute']});
