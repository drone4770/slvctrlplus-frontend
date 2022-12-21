import type {App, InjectionKey, Plugin} from "vue";
import { inject } from "vue";
import ClassToPlainSerializer from "../serialization/classToPlainSerializer.js";
import PlainToClassSerializer from "../serialization/plainToClassSerializer.js";

const classToPlainKey: InjectionKey<ClassToPlainSerializer> = Symbol('classToPlain')
const plainToClassKey: InjectionKey<PlainToClassSerializer> = Symbol('plainToClass')

export const useClassToPlainSerializer = () => inject(classToPlainKey, null)
export const usePlainToClassSerializer = () => inject(plainToClassKey, null)

export const classTransformer: Plugin = {
    install: async (app: App, options: any): Promise<void> => {
        const classToPlain = new ClassToPlainSerializer();
        const plainToClass = new PlainToClassSerializer();

        app.config.globalProperties.$classToPlain = classToPlain
        app.config.globalProperties.$plainToClass = plainToClass
        app.provide(classToPlainKey, classToPlain)
        app.provide(plainToClassKey, plainToClass)
    }
}
