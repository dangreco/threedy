import { Scale } from '../../Utils/Scale';

const getDimensions = (config, bounds, haScaleFactor) => {

    const scale = new Scale( (bounds.height / (config.ZAxis.height + config.Bottom.height)) * haScaleFactor);

    /* Bottom */
    const B_W = scale.val( config.Bottom.width );
    const B_H = scale.val( config.Bottom.height );

    /* Z Axis */
    const Z_W = scale.val( config.ZAxis.width );
    const Z_H = scale.val( config.ZAxis.height) + B_H; // Make intersection
    const Z_L = scale.val( config.ZAxis.offsetLeft );

    /* Bottom Pt. 2 */
    const B_T = Math.ceil(Z_H - B_H); // Fix pixel issue

    /* Build Plate */
    const P_W = scale.val( config.BuildPlate.maxWidth );
    const P_L = Z_L + Z_W + scale.val( config.BuildPlate.horizontalOffset );
    const P_T = B_T - scale.val( config.BuildPlate.verticalOffset ) - 8;

    /* Build Area */
    const A_W = P_W;
    const A_H = scale.val(config.BuildPlate.maxHeight);
    const A_L = P_L;
    const A_T = P_T - A_H;

    /* XAxis */ 
    const X_W = scale.val(config.XAxis.width);
    const X_H = scale.val(config.XAxis.height);
    const X_L = scale.val(config.XAxis.offsetLeft);
    
    /* Gantry */
    const G_W = scale.val(config.XAxis.extruder.width);
    const G_H = scale.val(config.XAxis.extruder.height);
    const G_L = P_L - (G_W)/ 2;

    /* Nozzle */
    const N_W = scale.val(12);
    const N_H = scale.val(12);
    const N_L = (G_W - N_W) / 2;
    const N_T = G_H;


    const G_T = P_T - (G_H + N_H);
    const X_T = G_T - scale.val(config.XAxis.extruder.offsetY)

    return {
        Bottom: {
            width: B_W,
            height: B_H,
            top: B_T
        },

        ZAxis: {
            width: Z_W,
            height: Z_H,
            left: Z_L
        },

        Scalable: {
            height: Z_H,
            width: B_W
        },

        BuildPlate: {
            width: P_W,
            left: P_L,
            top: P_T
        },

        XAxis: {
            width: X_W,
            height: X_H,
            left: X_L,
            top: X_T
        },

        Gantry: {
            width: G_W,
            height: G_H,
            left: G_L,
            top: G_T
        },

        Nozzle: {
            width: N_W,
            height: N_H,
            left: N_L,
            top: N_T
        },

        BuildArea: {
            width: A_W,
            height: A_H,
            left: A_L,
            top: A_T
        }

    }


}

export default getDimensions;