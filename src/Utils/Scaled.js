class Scaled extends Number {

    static scale_factor;

    constructor( value )
    {
        super(Scaled.scale_factor ? value * scale_factor : value)
    }

    static set_scale_factor(scale_factor)
    {
        this.scale_factor = scale_factor;
    }


}

export default Scaled;