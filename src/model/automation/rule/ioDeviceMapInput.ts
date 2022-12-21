import {Exclude, Expose, Type} from 'class-transformer';
import IoReference from "./ioReference.js";

@Exclude()
export default class IoDeviceMapInput
{
    @Expose()
    @Type(() => IoReference)
    private readonly reference: IoReference;

    @Expose()
    private readonly targetDeviceId: string;

    constructor(targetDeviceId: string, reference: IoReference) {
        this.reference = reference;
        this.targetDeviceId = targetDeviceId;
    }

    public get getReference(): IoReference {
        return this.reference;
    }

    public get getTargetDeviceId(): string {
        return this.targetDeviceId;
    }
}
