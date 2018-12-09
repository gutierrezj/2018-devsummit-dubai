define([
    "esri/WebScene",
    "esri/views/SceneView"
  ],
  function (
    WebScene,
    SceneView
  ) {
    let webscene, view, buildingsLayer, projectLayer;

    const websceneId = "3712088239a8484a82a46d0e5dde7fde";

    return {
      title: "Dubai Redevelopment",

      setup: function () {

        webscene = new WebScene({
          portalItem: {
            id: websceneId
          }
        });

        view = new SceneView({
          map: webscene,
          container: "viewDiv",
          padding: {
            top: 70,
            right: 500
          },
          ui: {
            padding: {
              right: 150
            }
          },
          qualityProfile: "high",
          
        });

        window.view = view;

        view.when(function () {
          projectLayer = webscene.layers.filter(function (layer) {
            return layer.title === "Project";
          }).getItemAt(0);

          buildingsLayer = webscene.layers.filter(function (layer) {
            return layer.title === "Buildings";
          }).getItemAt(0);

          contextLayer = webscene.layers.filter(function (layer) {
            return layer.title === "Context";
          }).getItemAt(0);
        })

        view.ui.empty("top-left");
      },

      steps: [

        /////////////////////////////////////////////////////////////////////////////////
        //
        //  Step 0: Add Scene Layer
        //
        /////////////////////////////////////////////////////////////////////////////////
        {
          title: "Add 3D Content",
          code: `
          var l = new SceneLayer( 
            portalItem: {
              id: "73df987984b24094b848d580eb83b0fb"
            }
          );
          // OR
          var l = new SceneLayer( 
            url: "https://..."
          );
          `,
          before: function(){
          },
          run:function(){
          }
        },

        /////////////////////////////////////////////////////////////////////////////////
        //
        //  Step 1: Change symbology
        //
        /////////////////////////////////////////////////////////////////////////////////
        {
          title: "Change existing building style",
          code: `
          buildingsLayer.renderer = {
            type: 'simple',
            symbol: {
              type: 'mesh-3d',
              symbolLayers: [{
                type: 'fill',
                material: {
                  color: '#FFEEBE'
                }
              }]
            }
          };
          `,
          before: function(){
            view.map.presentation.slides.getItemAt(1).applyTo(view);
          },
          run:function(){
            const colorRend = renderer = {
              type: 'simple',
              symbol: {
                type: 'mesh-3d',
                symbolLayers: [{
                  type: 'fill',
                  material: {
                    color: '#FFEEBE'
                  }
                }]
              }
            };
            buildingsLayer.renderer = colorRend;
            contextLayer.renderer = colorRend;
          }

        },
       
        /////////////////////////////////////////////////////////////////////////////////
        //
        //  Step 2: Add project layer
        //
        /////////////////////////////////////////////////////////////////////////////////

        {

          title: "Add project layer",

          code: `
const projectLayer = new SceneLayer("https://...");
view.map.add(projectLayer);
`,
          before: function () {
            view.map.presentation.slides.getItemAt(2).applyTo(view);
          },

          run: function () {
            view.map.presentation.slides.getItemAt(3).applyTo(view);
          }
        },

        /////////////////////////////////////////////////////////////////////////////////
        //
        //  Step 3: Emphasize the planned project
        //
        /////////////////////////////////////////////////////////////////////////////////

        {
          title: "Emphasize the planned project",

          code: `

const renderer = projectLayer.renderer.clone();
const fillSymbolLayer = renderer.symbol.symbolLayers.getItemAt(0);

fillSymbolLayer.edges = {
  type: 'sketch',
  color: "#534026",
  size: 1.5
};

projectLayer.renderer = renderer;
`,
          before: function () {
            view.map.presentation.slides.getItemAt(4).applyTo(view);
          },

          run: function () {
            const renderer = projectLayer.renderer.clone();
            const fillSymbolLayer = renderer.symbol.symbolLayers.getItemAt(0);

            fillSymbolLayer.edges = {
              type: 'sketch',
              color: "#534026",
              size: 1.5,
              extensionLength: 2
            };

            fillSymbolLayer.material = {
              color: "#FFFFFF"
            }

            projectLayer.renderer = renderer;
          }
        }

      ]
    }
  });