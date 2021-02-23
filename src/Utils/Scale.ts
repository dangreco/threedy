class Scale {

    scale_factor;

    constructor( scale_factor )
    {
        this.scale_factor = scale_factor;
    }

    
    val( value )
    {
        return this.scale_factor * value;
    }

    og( value )
    {
        return value / this.scale_factor;
    }

    scaleFactor()
    {
        return this.scale_factor;
    }

}

export {
    Scale
};