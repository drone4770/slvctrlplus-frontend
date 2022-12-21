import ObjectDiscriminator from "./objectDiscriminator.js";
import MappingRuleDefinition from "../../model/automation/rule/mappingRuleDefinition.js";

export default class RuleDefinitionDiscriminator extends ObjectDiscriminator{
    protected static discriminatorMap = [
        { value: MappingRuleDefinition, name: 'mapping' },
    ];
}
