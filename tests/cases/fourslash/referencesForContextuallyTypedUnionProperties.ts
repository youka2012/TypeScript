/// <reference path='fourslash.ts'/>

////interface A {
////    a: number;
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}common|]: string;|]
////}
////
////interface B {
////    b: number;
////    [|[|{| "isDefinition": true, "contextRangeIndex": 2 |}common|]: number;|]
////}
////
////// Assignment
////var v1: A | B = { a: 0, [|[|{| "isWriteAccess": true, "isDefinition": true, "type": "string", "contextRangeIndex": 4 |}common|]: ""|] };
////var v2: A | B = { b: 0, [|[|{| "isWriteAccess": true, "isDefinition": true, "type": "number", "contextRangeIndex": 6 |}common|]: 3|] };
////
////// Function call
////function consumer(f:  A | B) { }
////consumer({ a: 0, b: 0, [|[|{| "isWriteAccess": true, "isDefinition": true, "type": "number", "contextRangeIndex": 8 |}common|]: 1|] });
////
////// Type cast
////var c = <A | B> { [|[|{| "isWriteAccess": true, "isDefinition": true, "type": "number", "contextRangeIndex": 10 |}common|]: 0|], b: 0 };
////
////// Array literal
////var ar: Array<A|B> = [{ a: 0, [|[|{| "isWriteAccess": true, "isDefinition": true, "type": "string", "contextRangeIndex": 12 |}common|]: ""|] }, { b: 0, [|[|{| "isWriteAccess": true, "isDefinition": true, "type": "number", "contextRangeIndex": 14 |}common|]: 0|] }];
////
////// Nested object literal
////var ob: { aorb: A|B } = { aorb: { b: 0, [|[|{| "isWriteAccess": true, "isDefinition": true, "type": "number", "contextRangeIndex": 16 |}common|]: 0|] } };
////
////// Widened type
////var w: A|B = { a:0, [|[|{| "isWriteAccess": true, "isDefinition": true, "type": "undefined", "contextRangeIndex": 18 |}common|]: undefined|] };
////
////// Untped -- should not be included
////var u1 = { a: 0, b: 0, common: "" };
////var u2 = { b: 0, common: 0 };

const [aCommon, bCommon, ...unionRefs] = test.rangesByText().get("common");
verify.referenceGroups(aCommon, [
    { definition: "(property) A.common: string", ranges: [aCommon] },
    { definition: "(property) common: string | number", ranges: unionRefs },
]);
verify.referenceGroups(bCommon, [
    { definition: "(property) B.common: number", ranges: [bCommon] },
    { definition: "(property) common: string | number", ranges: unionRefs },
]);
verify.referenceGroups(unionRefs, [
    { definition: "(property) A.common: string", ranges: [aCommon] },
    { definition: "(property) B.common: number", ranges: [bCommon] },
    { definition: `(property) common: string | number`, ranges: unionRefs },
]);
