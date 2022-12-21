import {Exclude, Expose, Type} from 'class-transformer';
import IoReference from "./ioReference.js";

@Exclude()
export default class IoDeviceMapOutput
{
    @Expose()
    @Type(() => IoReference)
    private readonly reference: IoReference;

    constructor(reference: IoReference) {
        this.reference = reference;
    }

    public get getReference(): IoReference {
        return this.reference;
    }
}
