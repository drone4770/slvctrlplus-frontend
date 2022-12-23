import { defineStore } from "pinia";
import type RuleDefinition from "../model/automation/rule/ruleDefinition.js";
import { usePlainToClassSerializer } from "../plugins/classTransformer.js";
import RuleDefinitionList from "../model/automation/rule/ruleDefinitionList.js";
import type PlainToClassSerializer from "../serialization/plainToClassSerializer.js";
import { plainToInstance } from "class-transformer";

export type AutomationState = {
  ruleDefinitions: { [key: string]: RuleDefinition };
  ruleDefinitionsLoaded: boolean;
};

export const useAutomationStore = defineStore({
  id: "automation",
  state: () =>
    ({
      ruleDefinitions: {},
      ruleDefinitionsLoaded: false,
    } as AutomationState),
  getters: {
    ruleDefinitionList: (state) => Object.values(state.ruleDefinitions),
  },
  actions: {
    init() {
      fetch(`http://${location.hostname}:1337/rules`)
        .then((response) => response.json())
        .then((data) => {
          const ruleDefList = plainToInstance(RuleDefinitionList, data);
          for (const ruleDef of ruleDefList.getItems) {
            this.ruleDefinitions[ruleDef.getId] = ruleDef;
          }
          this.ruleDefinitionsLoaded = true;
        })
        .catch(console.log);
    },
  },
});
