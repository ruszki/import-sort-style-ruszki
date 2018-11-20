import {IStyleAPI, IStyleItem} from "import-sort-style";

export default function(styleApi: IStyleAPI): Array<IStyleItem> {
    const {
        and,
        hasNamespaceMember,
        hasNoMember,
        isAbsoluteModule,
        isRelativeModule,
        member,
        moduleName,
        name,
        startsWith,
        naturally,
    } = styleApi;
	
	const 

    return [
        // import "any"
        {
            match: hasNoMember,
            sort: moduleName(naturally),
        },

        // import * as any from "any";
        {
            match: hasNamespaceMember,
            sort: moduleName(naturally),
        },
        // import * as any from "./any";
        {
            match: and(isRelativeModule, moduleName(startsWith("./"))),
            sort: moduleName(naturally),
            sortNamedMembers: name(naturally),
        },

        {separator: true},

        // import any from "@app/any";
        {
            match: moduleName(startsWith("@app/")),
            sort: moduleName(naturally),
            sortNamedMembers: name(naturally),
        },

        {separator: true},

        // import any from "@img/any";
        {
            match: moduleName(startsWith("@img/")),
            sort: moduleName(naturally),
            sortNamedMembers: name(naturally),
        },

        {separator: true},

        // import any from "any";
        {
            match: isAbsoluteModule,
            sort: moduleName(naturally),
            sortNamedMembers: name(naturally),
        },

        {separator: true},

        // import any from "../any";
        {
            match: and(isRelativeModule, moduleName(startsWith("../"))),
            sort: moduleName(naturally),
            sortNamedMembers: name(naturally),
        },

        {separator: true},
    ];
}
