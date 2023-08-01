var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-mixed-chart/global/interfaces.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-mixed-chart/global/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callAPI = exports.getChartType = exports.concatUnique = exports.extractUniqueTimes = exports.groupByCategory = exports.groupArrayByKey = exports.formatNumberWithSeparators = exports.formatNumberByFormat = exports.formatNumber = void 0;
    ///<amd-module name='@scom/scom-mixed-chart/global/utils.ts'/> 
    const formatNumber = (num, options) => {
        if (num === null)
            return '-';
        const { decimals, format, percentValues } = options || {};
        if (percentValues) {
            return `${(0, exports.formatNumberWithSeparators)(num, 2)}%`;
        }
        if (format) {
            return (0, exports.formatNumberByFormat)(num, format);
        }
        const absNum = Math.abs(num);
        if (absNum >= 1000000000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000000000), decimals || 3) + 'B';
        }
        if (absNum >= 1000000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000000), decimals || 3) + 'M';
        }
        if (absNum >= 1000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000), decimals || 3) + 'K';
        }
        if (absNum < 0.0000001) {
            return (0, exports.formatNumberWithSeparators)(num);
        }
        if (absNum < 0.00001) {
            return (0, exports.formatNumberWithSeparators)(num, 6);
        }
        if (absNum < 0.001) {
            return (0, exports.formatNumberWithSeparators)(num, 4);
        }
        return (0, exports.formatNumberWithSeparators)(num, 2);
    };
    exports.formatNumber = formatNumber;
    const formatNumberByFormat = (num, format, separators) => {
        if (!format)
            return (0, exports.formatNumberWithSeparators)(num);
        const decimalPlaces = format.split('.')[1] ? format.split('.').length : 0;
        if (format.includes('%')) {
            return (0, exports.formatNumberWithSeparators)((num * 100), decimalPlaces) + '%';
        }
        const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
        const roundedNum = (0, exports.formatNumberWithSeparators)(num, decimalPlaces);
        if (separators || !(format.includes('m') || format.includes('a'))) {
            return format.indexOf('$') === 0 ? `${currencySymbol}${roundedNum}` : `${roundedNum}${currencySymbol}`;
        }
        const parts = roundedNum.split('.');
        const decimalPart = parts.length > 1 ? parts[1] : '';
        const integerPart = (0, exports.formatNumber)(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
        return `${currencySymbol}${integerPart}`;
    };
    exports.formatNumberByFormat = formatNumberByFormat;
    const formatNumberWithSeparators = (value, precision) => {
        if (!value)
            value = 0;
        if (precision || precision === 0) {
            let outputStr = '';
            if (value >= 1) {
                outputStr = value.toLocaleString('en-US', { maximumFractionDigits: precision });
            }
            else {
                outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
            }
            return outputStr;
        }
        return value.toLocaleString('en-US');
    };
    exports.formatNumberWithSeparators = formatNumberWithSeparators;
    const groupArrayByKey = (arr) => {
        const groups = new Map();
        for (const [key, value] of arr) {
            const strKey = key instanceof Date ? key.getTime().toString() : key.toString();
            const existingValue = groups.get(strKey);
            if (existingValue !== undefined) {
                if (typeof existingValue === 'number' && typeof value === 'number') {
                    groups.set(strKey, existingValue + value);
                }
                else {
                    groups.set(strKey, value);
                }
            }
            else {
                groups.set(strKey, value);
            }
        }
        return Array.from(groups.entries()).map(([key, value]) => {
            const parsedKey = isNaN(Number(key)) ? key : new Date(Number(key));
            return [parsedKey, value];
        });
    };
    exports.groupArrayByKey = groupArrayByKey;
    const groupByCategory = (data, category, xAxis, yAxis) => {
        return data.reduce((result, item) => {
            const _category = item[category];
            if (!result[_category]) {
                result[_category] = {};
            }
            result[_category][item[xAxis]] = item[yAxis];
            return result;
        }, {});
    };
    exports.groupByCategory = groupByCategory;
    const extractUniqueTimes = (data, keyValue) => {
        return data.reduce((acc, cur) => {
            if (!acc.hasOwnProperty(cur[keyValue])) {
                acc[cur[keyValue]] = null;
            }
            return acc;
        }, {});
    };
    exports.extractUniqueTimes = extractUniqueTimes;
    const concatUnique = (obj1, obj2) => {
        const merged = Object.assign(Object.assign({}, obj1), obj2);
        return Object.keys(merged).reduce((acc, key) => {
            if (!acc.hasOwnProperty(key)) {
                acc[key] = merged[key];
            }
            return acc;
        }, {});
    };
    exports.concatUnique = concatUnique;
    const getChartType = (type, defaultType) => {
        switch (type) {
            case 'area':
                return 'line';
            default:
                return type || defaultType;
        }
    };
    exports.getChartType = getChartType;
    const callAPI = async (apiEndpoint) => {
        if (!apiEndpoint)
            return [];
        try {
            const response = await fetch(apiEndpoint);
            const jsonData = await response.json();
            return jsonData.result.rows || [];
        }
        catch (error) {
            console.log(error);
        }
        return [];
    };
    exports.callAPI = callAPI;
});
define("@scom/scom-mixed-chart/global/index.ts", ["require", "exports", "@scom/scom-mixed-chart/global/interfaces.ts", "@scom/scom-mixed-chart/global/utils.ts"], function (require, exports, interfaces_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(interfaces_1, exports);
    __exportStar(utils_1, exports);
});
define("@scom/scom-mixed-chart/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.chartStyle = exports.containerStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.containerStyle = components_1.Styles.style({
        width: 'var(--layout-container-width)',
        maxWidth: 'var(--layout-container-max_width)',
        textAlign: 'var(--layout-container-text_align)',
        margin: '0 auto',
        padding: 10
    });
    exports.chartStyle = components_1.Styles.style({
        display: 'block',
    });
});
define("@scom/scom-mixed-chart/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_2.application.currentModuleDir;
    function fullPath(path) {
        if (path.indexOf('://') > 0)
            return path;
        return `${moduleDir}/${path}`;
    }
    exports.default = {
        fullPath
    };
});
define("@scom/scom-mixed-chart/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-mixed-chart/data.json.ts'/> 
    exports.default = {
        defaultBuilderData: {
            apiEndpoint: "/dune/query/1333833",
            title: 'Reserve Cumulative Value',
            description: 'Radiant Capital Reserve Markets (Weekly % change)',
            options: {
                xColumn: {
                    key: 'time',
                    type: 'time'
                },
                yColumns: [
                    'cumulative_dai',
                    'cumulative_usdc',
                    'cumulative_usdt',
                    'cumulative_wbtc',
                    'cumulative_weth',
                    'cumulative_tokens_value',
                    'cumulative_diff'
                ],
                globalSeriesType: 'area',
                stacking: true,
                seriesOptions: [
                    {
                        key: 'cumulative_dai',
                        title: 'DAI',
                        type: 'area',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_usdc',
                        title: 'USDC',
                        type: 'area',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_usdt',
                        title: 'USDT',
                        type: 'area',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_wbtc',
                        title: 'WBTC',
                        type: 'area',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_weth',
                        title: 'WETH',
                        type: 'area',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_tokens_value',
                        title: 'Total',
                        type: 'scatter',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_diff',
                        title: '% Change',
                        type: 'line',
                        yAxis: 'right',
                        color: '#ff0000'
                    }
                ],
                xAxis: {
                    title: 'Date',
                    tickFormat: 'MMM DD'
                },
                leftYAxis: {
                    labelFormat: '$0[].0a'
                },
                rightYAxis: {
                    tickFormat: '0[].0%',
                    labelFormat: '0[].0%'
                }
            }
        }
    };
});
define("@scom/scom-mixed-chart", ["require", "exports", "@ijstech/components", "@scom/scom-mixed-chart/global/index.ts", "@scom/scom-mixed-chart/index.css.ts", "@scom/scom-mixed-chart/assets.ts", "@scom/scom-mixed-chart/data.json.ts", "@scom/scom-chart-data-source-setup"], function (require, exports, components_3, index_1, index_css_1, assets_1, data_json_1, scom_chart_data_source_setup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    const currentTheme = components_3.Styles.Theme.currentTheme;
    const options = {
        type: 'object',
        properties: {
            xColumn: {
                type: 'object',
                title: 'X column',
                required: true,
                properties: {
                    key: {
                        type: 'string',
                        required: true
                    },
                    type: {
                        type: 'string',
                        enum: ['time', 'category'],
                        required: true
                    }
                }
            },
            yColumns: {
                type: 'array',
                title: 'Y columns',
                required: true,
                items: {
                    type: 'string'
                }
            },
            groupBy: {
                type: 'string'
            },
            globalSeriesType: {
                type: 'string',
                enum: [
                    'bar',
                    'line',
                    'area',
                    'scatter'
                ],
                required: true
            },
            smooth: {
                type: 'boolean'
            },
            stacking: {
                type: 'boolean'
            },
            legend: {
                type: 'object',
                properties: {
                    show: {
                        type: 'boolean'
                    },
                    scroll: {
                        type: 'boolean'
                    },
                    position: {
                        type: 'string',
                        enum: ['top', 'bottom', 'left', 'right']
                    }
                }
            },
            showSymbol: {
                type: 'boolean'
            },
            showDataLabels: {
                type: 'boolean'
            },
            percentage: {
                type: 'boolean'
            },
            xAxis: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string'
                    },
                    tickFormat: {
                        type: 'string'
                    },
                    reverseValues: {
                        type: 'boolean'
                    }
                }
            },
            leftYAxis: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string'
                    },
                    tickFormat: {
                        type: 'string'
                    },
                    labelFormat: {
                        type: 'string'
                    }
                }
            },
            rightYAxis: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string'
                    },
                    tickFormat: {
                        type: 'string'
                    },
                    labelFormat: {
                        type: 'string'
                    }
                }
            },
            seriesOptions: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        key: {
                            type: 'string',
                            required: true
                        },
                        title: {
                            type: 'string'
                        },
                        type: {
                            type: 'string',
                            enum: [
                                'bar',
                                'line',
                                'area',
                                'scatter'
                            ],
                            required: true
                        },
                        yAxis: {
                            type: 'string',
                            enum: [
                                'left',
                                'right'
                            ],
                            required: true
                        },
                        zIndex: {
                            type: 'number'
                        },
                        color: {
                            type: 'string',
                            format: 'color'
                        }
                    }
                }
            }
        }
    };
    let ScomMixedChart = class ScomMixedChart extends components_3.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.chartData = [];
            this.apiEndpoint = '';
            this._data = { apiEndpoint: '', title: '', options: undefined, mode: scom_chart_data_source_setup_1.ModeType.LIVE };
            this.tag = {};
            this.defaultEdit = true;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.updateChartData();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    this.tag[prop] = newValue[prop];
                }
            }
            this.width = this.tag.width || 700;
            this.height = this.tag.height || 500;
            this.onUpdateBlock();
        }
        getPropertiesSchema() {
            const propertiesSchema = {
                type: 'object',
                properties: {
                    // apiEndpoint: {
                    //   type: 'string',
                    //   title: 'API Endpoint',
                    //   required: true
                    // },
                    title: {
                        type: 'string',
                        required: true
                    },
                    description: {
                        type: 'string'
                    },
                    options
                }
            };
            return propertiesSchema;
        }
        getGeneralSchema() {
            const propertiesSchema = {
                type: 'object',
                required: ['title'],
                properties: {
                    // apiEndpoint: {
                    //   type: 'string'
                    // },
                    title: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    }
                }
            };
            return propertiesSchema;
        }
        getAdvanceSchema() {
            const propertiesSchema = {
                type: 'object',
                properties: {
                    options
                }
            };
            return propertiesSchema;
        }
        getThemeSchema() {
            const themeSchema = {
                type: 'object',
                properties: {
                    darkShadow: {
                        type: 'boolean'
                    },
                    fontColor: {
                        type: 'string',
                        format: 'color'
                    },
                    backgroundColor: {
                        type: 'string',
                        format: 'color'
                    },
                    // width: {
                    //   type: 'string'
                    // },
                    height: {
                        type: 'string'
                    }
                }
            };
            return themeSchema;
        }
        _getActions(propertiesSchema, themeSchema, advancedSchema) {
            const actions = [
                {
                    name: 'Data Source',
                    icon: 'database',
                    command: (builder, userInputData) => {
                        let _oldData = { apiEndpoint: '', title: '', options: undefined, mode: scom_chart_data_source_setup_1.ModeType.LIVE };
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.mode)
                                    this._data.mode = userInputData === null || userInputData === void 0 ? void 0 : userInputData.mode;
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.file)
                                    this._data.file = userInputData === null || userInputData === void 0 ? void 0 : userInputData.file;
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.apiEndpoint)
                                    this._data.apiEndpoint = userInputData === null || userInputData === void 0 ? void 0 : userInputData.apiEndpoint;
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                            },
                            redo: () => { }
                        };
                    },
                    customUI: {
                        render: (data, onConfirm) => {
                            const vstack = new components_3.VStack(null, { gap: '1rem' });
                            const config = new scom_chart_data_source_setup_1.default(null, Object.assign(Object.assign({}, this._data), { chartData: JSON.stringify(this.chartData) }));
                            const hstack = new components_3.HStack(null, {
                                verticalAlignment: 'center',
                                horizontalAlignment: 'end'
                            });
                            const button = new components_3.Button(null, {
                                caption: 'Confirm',
                                width: 'auto',
                                height: 40,
                                font: { color: Theme.colors.primary.contrastText }
                            });
                            hstack.append(button);
                            vstack.append(config);
                            vstack.append(hstack);
                            button.onClick = async () => {
                                const { apiEndpoint, file, mode } = config.data;
                                if (mode === 'Live') {
                                    if (!apiEndpoint)
                                        return;
                                    this._data.apiEndpoint = apiEndpoint;
                                    this.updateChartData();
                                }
                                else {
                                    if (!(file === null || file === void 0 ? void 0 : file.cid))
                                        return;
                                    this.chartData = config.data.chartData ? JSON.parse(config.data.chartData) : [];
                                    this.onUpdateBlock();
                                }
                                if (onConfirm) {
                                    onConfirm(true, Object.assign(Object.assign({}, this._data), { apiEndpoint, file, mode }));
                                }
                            };
                            return vstack;
                        }
                    }
                },
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        let _oldData = { apiEndpoint: '', title: '', options: undefined, mode: scom_chart_data_source_setup_1.ModeType.LIVE };
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                if (userInputData) {
                                    if (advancedSchema) {
                                        this._data = Object.assign(Object.assign({}, this._data), userInputData);
                                    }
                                    else {
                                        this._data = Object.assign({}, userInputData);
                                    }
                                }
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema,
                    userInputUISchema: advancedSchema ? undefined : {
                        type: 'VerticalLayout',
                        elements: [
                            // {
                            //   type: 'Control',
                            //   scope: '#/properties/apiEndpoint',
                            //   title: 'API Endpoint'
                            // },
                            {
                                type: 'Control',
                                scope: '#/properties/title'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/description'
                            },
                            {
                                type: 'VerticalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/xColumn',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/yColumns',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/groupBy',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/globalSeriesType',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/smooth',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/stacking',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/legend',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/showSymbol',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/showDataLabels',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/percentage',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/xAxis',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/leftYAxis',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/rightYAxis',
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/options/properties/seriesOptions',
                                        options: {
                                            detail: {
                                                type: 'VerticalLayout'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    command: (builder, userInputData) => {
                        let oldTag = {};
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(userInputData);
                                else
                                    this.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
                }
            ];
            if (advancedSchema) {
                const advanced = {
                    name: 'Advanced',
                    icon: 'sliders-h',
                    command: (builder, userInputData) => {
                        let _oldData = { globalSeriesType: 'line', seriesOptions: [] };
                        return {
                            execute: async () => {
                                var _a;
                                _oldData = Object.assign({}, (_a = this._data) === null || _a === void 0 ? void 0 : _a.options);
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.options) !== undefined)
                                    this._data.options = userInputData.options;
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                this._data.options = Object.assign({}, _oldData);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: advancedSchema,
                    userInputUISchema: {
                        type: 'VerticalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/xColumn',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/yColumns',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/groupBy',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/globalSeriesType',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/smooth',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/stacking',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/legend',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/showSymbol',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/showDataLabels',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/percentage',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/xAxis',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/leftYAxis',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/rightYAxis',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/seriesOptions',
                                options: {
                                    detail: {
                                        type: 'VerticalLayout'
                                    }
                                }
                            }
                        ]
                    }
                };
                actions.push(advanced);
            }
            return actions;
        }
        getConfigurators() {
            const self = this;
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        return this._getActions(this.getGeneralSchema(), this.getThemeSchema(), this.getAdvanceSchema());
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData(Object.assign(Object.assign({}, defaultData), data));
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getActions: () => {
                        return this._getActions(this.getPropertiesSchema(), this.getThemeSchema());
                    },
                    getLinkParams: () => {
                        const data = this._data || {};
                        return {
                            data: window.btoa(JSON.stringify(data))
                        };
                    },
                    setLinkParams: async (params) => {
                        if (params.data) {
                            const utf8String = decodeURIComponent(params.data);
                            const decodedString = window.atob(utf8String);
                            const newData = JSON.parse(decodedString);
                            let resultingData = Object.assign(Object.assign({}, self._data), newData);
                            await this.setData(resultingData);
                        }
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        updateTheme() {
            var _a, _b, _c;
            if (this.chartContainer) {
                this.chartContainer.style.boxShadow = ((_a = this.tag) === null || _a === void 0 ? void 0 : _a.darkShadow) ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            }
            this.updateStyle('--text-primary', (_b = this.tag) === null || _b === void 0 ? void 0 : _b.fontColor);
            this.updateStyle('--background-main', (_c = this.tag) === null || _c === void 0 ? void 0 : _c.backgroundColor);
        }
        onUpdateBlock() {
            this.renderChart();
            this.updateTheme();
        }
        async updateChartData() {
            var _a;
            this.loadingElm.visible = true;
            if (((_a = this._data) === null || _a === void 0 ? void 0 : _a.mode) === scom_chart_data_source_setup_1.ModeType.SNAPSHOT)
                await this.renderSnapshotData();
            else
                await this.renderLiveData();
            this.loadingElm.visible = false;
        }
        async renderSnapshotData() {
            var _a;
            if ((_a = this._data.file) === null || _a === void 0 ? void 0 : _a.cid) {
                const data = await (0, scom_chart_data_source_setup_1.fetchContentByCID)(this._data.file.cid);
                if (data) {
                    this.chartData = data;
                    this.onUpdateBlock();
                    return;
                }
            }
            this.chartData = [];
            this.onUpdateBlock();
        }
        async renderLiveData() {
            if (this._data.apiEndpoint === this.apiEndpoint) {
                this.onUpdateBlock();
                return;
            }
            const apiEndpoint = this._data.apiEndpoint;
            this.apiEndpoint = apiEndpoint;
            if (apiEndpoint) {
                let data = null;
                try {
                    data = await (0, index_1.callAPI)(apiEndpoint);
                    if (data && this._data.apiEndpoint === apiEndpoint) {
                        this.chartData = data;
                        this.onUpdateBlock();
                        return;
                    }
                }
                catch (_a) { }
            }
            this.chartData = [];
            this.onUpdateBlock();
        }
        renderChart() {
            if ((!this.pnlChart && this._data.options) || !this._data.options)
                return;
            const { title, description, options } = this._data;
            this.lbTitle.caption = title;
            this.lbDescription.caption = description;
            this.lbDescription.visible = !!description;
            this.pnlChart.height = `calc(100% - ${this.vStackInfo.offsetHeight + 10}px)`;
            const { xColumn, yColumns, groupBy, globalSeriesType, seriesOptions, smooth, stacking, legend, showSymbol, showDataLabels, percentage, xAxis, leftYAxis, rightYAxis } = options;
            const { key, type } = xColumn;
            let _legend = {
                show: legend === null || legend === void 0 ? void 0 : legend.show,
            };
            if (legend === null || legend === void 0 ? void 0 : legend.position) {
                _legend[legend.position] = 'auto';
                if (['left', 'right'].includes(legend.position)) {
                    _legend['orient'] = 'vertical';
                }
            }
            if (legend === null || legend === void 0 ? void 0 : legend.scroll) {
                _legend['type'] = 'scroll';
            }
            let yAxisMapping = {};
            let labelFormats = {};
            for (const opt of seriesOptions) {
                yAxisMapping[opt.yAxis] = true;
                labelFormats[opt.title || opt.key] = opt.yAxis === 'left' ? leftYAxis === null || leftYAxis === void 0 ? void 0 : leftYAxis.labelFormat : rightYAxis === null || rightYAxis === void 0 ? void 0 : rightYAxis.labelFormat;
            }
            let _yAxis = [];
            Object.keys(yAxisMapping).map(v => {
                const yAxis = v === 'left' ? leftYAxis : rightYAxis;
                _yAxis.push({
                    type: 'value',
                    name: (yAxis === null || yAxis === void 0 ? void 0 : yAxis.title) || '',
                    nameLocation: 'center',
                    nameGap: (yAxis === null || yAxis === void 0 ? void 0 : yAxis.title) ? 40 : 15,
                    nameTextStyle: {
                        fontWeight: 'bold'
                    },
                    position: v,
                    axisLabel: {
                        showMinLabel: false,
                        showMaxLabel: false,
                        fontSize: 10,
                        position: 'end',
                        formatter: (value, index) => {
                            return (0, index_1.formatNumber)(value, { format: yAxis === null || yAxis === void 0 ? void 0 : yAxis.tickFormat, decimals: 2, percentValues: percentage });
                        }
                    },
                    splitNumber: 4
                });
            });
            let _series = [];
            let arr = this.chartData;
            const item = (arr && arr[0]) || {};
            if (groupBy && item[groupBy] !== undefined) {
                const group = (0, index_1.groupByCategory)(arr, groupBy, key, yColumns[0]);
                const times = (0, index_1.extractUniqueTimes)(arr, key);
                let groupData = {};
                const keys = Object.keys(group);
                keys.map(v => {
                    const _data = (0, index_1.concatUnique)(times, group[v]);
                    groupData[v] = (0, index_1.groupArrayByKey)(Object.keys(_data).map(m => [type === 'time' ? new Date(m) : m, _data[m]]));
                });
                const isPercentage = percentage && groupData[keys[0]] && typeof groupData[keys[0]][0][1] === 'number';
                _series = keys.map(v => {
                    const seriesOpt = seriesOptions === null || seriesOptions === void 0 ? void 0 : seriesOptions.find(f => f.key === v);
                    let _data = [];
                    if (isPercentage) {
                        _data = groupData[v].map((vals, idx) => {
                            let total = 0;
                            for (const k of keys) {
                                total += groupData[k][idx][1];
                            }
                            return [vals[0], (vals[1] / total) * 100];
                        });
                    }
                    else {
                        _data = groupData[v];
                    }
                    const isArea = (!(seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.type) && globalSeriesType === 'area') || (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.type) === 'area';
                    const lineStyle = isArea ? {
                        border: 'transparent',
                        width: 0
                    } : undefined;
                    return {
                        name: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.title) || v,
                        type: (0, index_1.getChartType)((seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.type) || globalSeriesType, 'line'),
                        stack: stacking ? `Total_${seriesOpt.type}_${seriesOpt.yAxis}` : undefined,
                        smooth: smooth,
                        itemStyle: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.color) ? { color: seriesOpt.color } : undefined,
                        lineStyle,
                        areaStyle: isArea ? {} : undefined,
                        emphasis: {
                            focus: 'series'
                        },
                        showSymbol: !!showSymbol,
                        symbolSize: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.type) === 'scatter' ? 6 : undefined,
                        label: showDataLabels ? {
                            show: true,
                            formatter: function (params) {
                                return (0, index_1.formatNumber)(params.value);
                            }
                        } : undefined,
                        data: _data,
                        z: seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.zIndex,
                        yAxisIndex: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.yAxis) ? _yAxis.findIndex(f => f.position === seriesOpt.yAxis) : undefined
                    };
                });
            }
            else {
                let groupData = {};
                let isPercentage = percentage && arr.length > 0;
                yColumns.map(col => {
                    if (isPercentage && typeof arr[0][col] !== 'number') {
                        isPercentage = false;
                    }
                    groupData[col] = (0, index_1.groupArrayByKey)(arr.map(v => [type === 'time' ? new Date(v[key]) : col, v[col]]));
                });
                _series = yColumns.map((col) => {
                    let _data = [];
                    const seriesOpt = seriesOptions === null || seriesOptions === void 0 ? void 0 : seriesOptions.find(f => f.key === col);
                    if (isPercentage) {
                        _data = groupData[col].map((vals, idx) => {
                            let total = 0;
                            for (const k of yColumns) {
                                total += groupData[k][idx][1];
                            }
                            return [vals[0], (vals[1] / total) * 100];
                        });
                    }
                    else {
                        _data = groupData[col];
                    }
                    const isArea = (!(seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.type) && globalSeriesType === 'area') || (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.type) === 'area';
                    const lineStyle = isArea ? {
                        border: 'transparent',
                        width: 0
                    } : undefined;
                    return {
                        name: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.title) || col,
                        type: (0, index_1.getChartType)((seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.type) || globalSeriesType, 'line'),
                        stack: stacking ? `Total_${seriesOpt.type}_${seriesOpt.yAxis}` : undefined,
                        smooth: smooth,
                        itemStyle: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.color) ? { color: seriesOpt.color } : undefined,
                        lineStyle,
                        areaStyle: isArea ? {} : undefined,
                        emphasis: {
                            focus: 'series'
                        },
                        showSymbol: !!showSymbol,
                        symbolSize: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.type) === 'scatter' ? 6 : undefined,
                        label: showDataLabels ? {
                            show: true,
                            formatter: function (params) {
                                return (0, index_1.formatNumber)(params.value);
                            }
                        } : undefined,
                        data: _data,
                        z: seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.zIndex,
                        yAxisIndex: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.yAxis) ? _yAxis.findIndex(f => f.position === seriesOpt.yAxis) : undefined
                    };
                });
            }
            let min = 0, max = 0;
            const isSingle = _series.length === 1;
            if (isSingle) {
                const arr = _series[0].data.filter(v => v[1] !== null).map(v => v[1]);
                min = Math.min(...arr);
                max = Math.max(...arr);
                const step = (max - min) / 5;
                min = min > step ? min - step : min;
                max += step;
            }
            const minInterval = (max - min) / 4;
            const power = Math.pow(10, Math.floor(Math.log10(minInterval)));
            const roundedInterval = Math.ceil(minInterval / power) * power;
            const _chartData = {
                tooltip: {
                    trigger: 'axis',
                    position: function (point, params, dom, rect, size) {
                        var x = point[0];
                        var y = point[1];
                        var viewWidth = document.documentElement.clientWidth;
                        var viewHeight = document.documentElement.clientHeight;
                        var boxWidth = size.contentSize[0];
                        var boxHeight = size.contentSize[1];
                        // calculate x position of tooltip
                        if (x + boxWidth > viewWidth) {
                            x = x - boxWidth;
                        }
                        // calculate y position of tooltip
                        if (y + boxHeight > viewHeight) {
                            y = y - boxHeight;
                        }
                        if (x < 0)
                            x = 0;
                        if (y < 0)
                            y = 0;
                        return [x, y];
                    },
                    formatter: (params) => {
                        let res = `<b>${xColumn.type === 'time' ? (0, components_3.moment)(params[0].axisValue).format('YYYY-MM-DD HH:mm') : params[0].axisValue}</b>`;
                        if (_series.length === 1) {
                            res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${params[0].marker} ${params[0].seriesName}</span> ${params[0].value[1] === null ? '-' : percentage ? (0, index_1.formatNumber)(params[0].value[1], { percentValues: true }) : (0, index_1.formatNumberByFormat)(params[0].value[1], labelFormats[params[0].seriesName])}</div>`;
                        }
                        else {
                            for (const param of params) {
                                if (param.value[1] !== null) {
                                    res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${param.marker} ${param.seriesName}</span> ${percentage ? (0, index_1.formatNumber)(param.value[1], { percentValues: true }) : (0, index_1.formatNumberByFormat)(param.value[1], labelFormats[param.seriesName])}</div>`;
                                }
                            }
                        }
                        return res;
                    },
                    axisPointer: {
                        type: 'cross',
                        label: {
                            show: false
                        }
                    }
                },
                legend: _legend,
                xAxis: {
                    type: type,
                    boundaryGap: false,
                    inverse: xAxis === null || xAxis === void 0 ? void 0 : xAxis.reverseValues,
                    name: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.title) || '',
                    nameLocation: 'center',
                    nameGap: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.title) ? 25 : 15,
                    nameTextStyle: {
                        fontWeight: 'bold'
                    },
                    axisLabel: {
                        fontSize: 10,
                        hideOverlap: true,
                        formatter: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.tickFormat) ? (value, index) => {
                            if (type === 'time') {
                                return (0, components_3.moment)(value).format(xAxis.tickFormat);
                            }
                            else {
                                if (isNaN(value))
                                    return value;
                                return (0, index_1.formatNumber)(value, { format: xAxis.tickFormat, decimals: 2 });
                            }
                        } : undefined
                    }
                },
                yAxis: _yAxis.map(v => {
                    return Object.assign(Object.assign({}, v), { min: isSingle ? min : undefined, max: isSingle ? max : undefined, interval: isSingle ? roundedInterval : undefined });
                }),
                series: _series
            };
            this.pnlChart.clearInnerHTML();
            const chart = new components_3.LineChart(this.pnlChart, {
                data: _chartData,
                width: '100%',
                height: '100%'
            });
            chart.data = _chartData;
            chart.drawChart();
        }
        resizeChart() {
            var _a;
            if (this.pnlChart) {
                (_a = this.pnlChart.firstChild) === null || _a === void 0 ? void 0 : _a.resize();
            }
        }
        async init() {
            this.isReadyCallbackQueued = true;
            super.init();
            this.updateTheme();
            this.setTag({
                fontColor: currentTheme.text.primary,
                backgroundColor: currentTheme.background.main,
                darkShadow: false,
                height: 500
            });
            this.maxWidth = '100%';
            this.chartContainer.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            this.classList.add(index_css_1.chartStyle);
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const data = this.getAttribute('data', true);
                if (data) {
                    this.setData(data);
                }
            }
            this.isReadyCallbackQueued = false;
            this.executeReadyCallback();
            window.addEventListener('resize', () => {
                setTimeout(() => {
                    this.resizeChart();
                }, 300);
            });
        }
        render() {
            return (this.$render("i-vstack", { id: "chartContainer", position: "relative", background: { color: Theme.background.main }, height: "100%", padding: { top: 10, bottom: 10, left: 10, right: 10 }, class: index_css_1.containerStyle },
                this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                    this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                        this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }))),
                this.$render("i-vstack", { id: "vStackInfo", width: "100%", maxWidth: "100%", margin: { left: 'auto', right: 'auto', bottom: 10 }, verticalAlignment: "center" },
                    this.$render("i-label", { id: "lbTitle", font: { bold: true, color: Theme.text.primary } }),
                    this.$render("i-label", { id: "lbDescription", margin: { top: 5 }, font: { color: Theme.text.primary } })),
                this.$render("i-panel", { id: "pnlChart", width: "100%", height: "inherit" })));
        }
    };
    ScomMixedChart = __decorate([
        components_3.customModule,
        (0, components_3.customElements)('i-scom-mixed-chart')
    ], ScomMixedChart);
    exports.default = ScomMixedChart;
});
