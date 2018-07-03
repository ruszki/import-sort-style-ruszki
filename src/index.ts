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
        unicode,
    } = styleApi;

    return [
        // import "any"
        {
            match: and(hasNoMember),
            sort: moduleName(unicode),
        },

        // import * as any from "any";
        {
            match: hasNamespaceMember,
            sort: moduleName(unicode),
        },
        // import * as any from "./any";
        {
            match: and(isRelativeModule, moduleName(startsWith("./"))),
            sort: moduleName(unicode),
            sortNamedMembers: name(unicode),
        },

        {separator: true},

        // import any from "@app/any";
        {
            match: moduleName(startsWith("@app/")),
            sort: moduleName(unicode),
            sortNamedMembers: name(unicode),
        },

        {separator: true},

        // import any from "@img/any";
        {
            match: moduleName(startsWith("@img/")),
            sort: moduleName(unicode),
            sortNamedMembers: name(unicode),
        },

        {separator: true},

        // import any from "any";
        {
            match: isAbsoluteModule,
            sort: moduleName(unicode),
            sortNamedMembers: name(unicode),
        },

        {separator: true},

        // import any from "../any";
        {
            match: and(isRelativeModule, moduleName(startsWith("../"))),
            sort: moduleName(unicode),
            sortNamedMembers: name(unicode),
        },

        {separator: true},
    ];
}
