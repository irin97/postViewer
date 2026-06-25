type Primitive = string | number | boolean | null | undefined;
export type FormValue = Primitive | FormObject | FormValue[];

interface FormObject {
    [key: string]: FormValue;
}


export function serializeForm(
    obj: FormValue,
    prefix = "",
    params: URLSearchParams = new URLSearchParams()
): URLSearchParams {
    if (obj === null || obj === undefined) return params;

    if (typeof obj !== "object") {
        params.append(prefix, String(obj));
        return params;
    }

    // if (Array.isArray(obj)) {
    //     obj.forEach((value, index) => {
    //         const key = `${prefix}[${index}]`;
    //         serializeForm(value, key, params);
    //     });
    //     return params;
    // }

    if (Array.isArray(obj)) {
        obj.forEach((value) => {
            params.append(prefix, String(value));
        });
        return params;
    }

    Object.entries(obj).forEach(([key, value]) => {
        const newKey = prefix ? `${prefix}[${key}]` : key;
        serializeForm(value, newKey, params);
    });

    return params;
}