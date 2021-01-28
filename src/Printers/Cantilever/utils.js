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

    /* XAxis */ 
    const X_W = scale.val(config.XAxis.width);
    const X_H = scale.val(config.XAxis.height);
    const X_L = scale.val(config.XAxis.offsetLeft);

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
            left: X_L
        }

    }


}

export default getDimensions;