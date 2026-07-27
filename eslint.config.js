import js from "eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import globals from "globals";
import reacthooks from "eslint-plugin-react-hooks";
import reactrefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint";

export default tseslint.config(
    { ignores: ["dist", "output", ".vinxi"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languangeOptions: {
            ecmaversion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reacthooks,
            "react-refresh": reactrefresh,
        },
        rules: {
            ...reacthooks.configs.recommended.rules,
            "no-restricted-imports": [
                "error",
                {
                    paths: [
                        {
                            name: "server-only",
                            message:
                                "tanStack Start does not use the Next.js `server-only`package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
                        },
                    ],
                },
            ],
            "react-refresh/only-export-components": ["warn", {
                allowConstantExport: true }], 
                "@typescript-enlist/no-unused-vars": "off",
        },
    },
    eslintPluginPrettier,   
);