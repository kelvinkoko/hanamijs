import Rule from "./Rule";

export default class LSystem {
  applyRules = (axiom: string, rules: Rule[]): string => {
    let expression = "";
    for (let i = 0; i < axiom.length; i++) {
      const symbol = axiom.charAt(i);
      const rule = this.findApplicableRule(symbol, rules);
      if (rule) {
        expression += rule.to;
      } else {
        expression += symbol;
      }
    }
    return expression;
  };

  private findApplicableRule(symbol: string, rules: Rule[]): Rule | null {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (symbol === rule.from) {
        return rule;
      }
    }
    return null;
  }
}
