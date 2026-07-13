export type Goal="appearance"|"resale"|"damage"|"functionality";
export type Priority="cost"|"quality"|"speed"|"risk"|"longTerm";
export type Experience="none"|"some"|"experienced";
export type Ownership="sellingSoon"|"mediumTerm"|"longTerm";
export type StrategyId="diy"|"hybrid"|"professional"|"delay";
export interface DecisionAnswers{goal?:Goal;priority?:Priority;experience?:Experience;ownership?:Ownership}
export interface StrategyScore{id:StrategyId;label:string;score:number}
export interface DecisionResult{winner:StrategyScore;alternatives:StrategyScore[];headline:string;summary:string;reasons:string[];whyNot:Array<{id:StrategyId;title:string;explanation:string}>;actionPlan:string[];estimatedSavings?:string;stopConditions:string[]}
