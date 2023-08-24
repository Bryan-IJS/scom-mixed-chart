/// <amd-module name="@scom/scom-mixed-chart/global/interfaces.ts" />
declare module "@scom/scom-mixed-chart/global/interfaces.ts" {
    import { ModeType } from "@scom/scom-chart-data-source-setup";
    export interface IMixedChartOptions {
        xColumn?: {
            key: string;
            type: 'time' | 'category';
        };
        yColumns?: string[];
        globalSeriesType: 'bar' | 'line' | 'area' | 'scatter';
        groupBy?: string;
        seriesOptions: {
            key: string;
            type: 'bar' | 'line' | 'area' | 'scatter';
            yAxis: 'left' | 'right';
            zIndex?: number;
            title?: string;
            color?: string;
        }[];
        stacking?: boolean;
        xAxis?: {
            title?: string;
            tickFormat?: string;
            reverseValues?: boolean;
        };
        leftYAxis?: {
            title?: string;
            tickFormat?: string;
            labelFormat?: string;
        };
        rightYAxis?: {
            title?: string;
            tickFormat?: string;
            labelFormat?: string;
        };
        smooth?: boolean;
        legend?: {
            show?: boolean;
            scroll?: boolean;
            position?: 'top' | 'bottom' | 'left' | 'right';
        };
        showSymbol?: boolean;
        showDataLabels?: boolean;
        percentage?: boolean;
    }
    export interface IMixedChartConfig {
        dataSource: string;
        queryId?: string;
        apiEndpoint?: string;
        title: string;
        description?: string;
        options: IMixedChartOptions;
        file?: {
            cid: string;
            name: string;
        };
        mode: ModeType;
    }
    export interface IFetchDataOptions {
        dataSource: string;
        queryId?: string;
        apiEndpoint?: string;
    }
}
/// <amd-module name="@scom/scom-mixed-chart/global/utils.ts" />
declare module "@scom/scom-mixed-chart/global/utils.ts" {
    import { IFetchDataOptions } from "@scom/scom-mixed-chart/global/interfaces.ts";
    export const formatNumber: (num: number, options?: {
        format?: string;
        decimals?: number;
        percentValues?: boolean;
    }) => any;
    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export const groupArrayByKey: (arr: [Date | string, string | number][]) => (string | number | Date)[][];
    export const groupByCategory: (data: {
        [key: string]: any;
    }[], category: string, xAxis: string, yAxis: string) => {
        [key: string]: any;
    };
    export const extractUniqueTimes: (data: {
        [key: string]: any;
    }[], keyValue: string) => {
        [key: string]: any;
    };
    export const concatUnique: (obj1: {
        [key: string]: any;
    }, obj2: {
        [key: string]: any;
    }) => {};
    export const getChartType: (type: string, defaultType?: string) => string;
    export const callAPI: (options: IFetchDataOptions) => Promise<any>;
}
/// <amd-module name="@scom/scom-mixed-chart/global/index.ts" />
declare module "@scom/scom-mixed-chart/global/index.ts" {
    export * from "@scom/scom-mixed-chart/global/interfaces.ts";
    export * from "@scom/scom-mixed-chart/global/utils.ts";
}
/// <amd-module name="@scom/scom-mixed-chart/index.css.ts" />
declare module "@scom/scom-mixed-chart/index.css.ts" {
    export const containerStyle: string;
    export const chartStyle: string;
}
/// <amd-module name="@scom/scom-mixed-chart/assets.ts" />
declare module "@scom/scom-mixed-chart/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-mixed-chart/data.json.ts" />
declare module "@scom/scom-mixed-chart/data.json.ts" {
    const _default_1: {
        defaultBuilderData: {
            dataSource: string;
            queryId: string;
            title: string;
            description: string;
            options: {
                xColumn: {
                    key: string;
                    type: string;
                };
                yColumns: string[];
                globalSeriesType: string;
                stacking: boolean;
                seriesOptions: ({
                    key: string;
                    title: string;
                    type: string;
                    yAxis: string;
                    color?: undefined;
                } | {
                    key: string;
                    title: string;
                    type: string;
                    yAxis: string;
                    color: string;
                })[];
                xAxis: {
                    title: string;
                    tickFormat: string;
                };
                leftYAxis: {
                    labelFormat: string;
                };
                rightYAxis: {
                    tickFormat: string;
                    labelFormat: string;
                };
            };
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-mixed-chart/formSchema.ts" />
declare module "@scom/scom-mixed-chart/formSchema.ts" {
    export function getBuilderSchema(): {
        general: {
            dataSchema: {
                type: string;
                required: string[];
                properties: {
                    title: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                };
            };
            uiSchema: {
                type: string;
                elements: ({
                    type: string;
                    scope: string;
                    elements?: undefined;
                } | {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        options?: undefined;
                    } | {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    })[];
                    scope?: undefined;
                })[];
            };
        };
        advanced: {
            dataSchema: {
                type: string;
                properties: {
                    options: {
                        type: string;
                        title: string;
                        properties: {
                            xColumn: {
                                type: string;
                                title: string;
                                required: boolean;
                                properties: {
                                    key: {
                                        type: string;
                                        required: boolean;
                                    };
                                    type: {
                                        type: string;
                                        enum: string[];
                                        required: boolean;
                                    };
                                };
                            };
                            yColumns: {
                                type: string;
                                title: string;
                                required: boolean;
                                items: {
                                    type: string;
                                };
                            };
                            groupBy: {
                                type: string;
                            };
                            globalSeriesType: {
                                type: string;
                                enum: string[];
                                required: boolean;
                            };
                            smooth: {
                                type: string;
                            };
                            stacking: {
                                type: string;
                            };
                            legend: {
                                type: string;
                                properties: {
                                    show: {
                                        type: string;
                                    };
                                    scroll: {
                                        type: string;
                                    };
                                    position: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                            };
                            showSymbol: {
                                type: string;
                            };
                            showDataLabels: {
                                type: string;
                            };
                            percentage: {
                                type: string;
                            };
                            xAxis: {
                                type: string;
                                properties: {
                                    title: {
                                        type: string;
                                    };
                                    tickFormat: {
                                        type: string;
                                    };
                                    reverseValues: {
                                        type: string;
                                    };
                                };
                            };
                            leftYAxis: {
                                type: string;
                                properties: {
                                    title: {
                                        type: string;
                                    };
                                    tickFormat: {
                                        type: string;
                                    };
                                    labelFormat: {
                                        type: string;
                                    };
                                };
                            };
                            rightYAxis: {
                                type: string;
                                properties: {
                                    title: {
                                        type: string;
                                    };
                                    tickFormat: {
                                        type: string;
                                    };
                                    labelFormat: {
                                        type: string;
                                    };
                                };
                            };
                            seriesOptions: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        key: {
                                            type: string;
                                            required: boolean;
                                        };
                                        title: {
                                            type: string;
                                        };
                                        type: {
                                            type: string;
                                            enum: string[];
                                            required: boolean;
                                        };
                                        yAxis: {
                                            type: string;
                                            enum: string[];
                                            required: boolean;
                                        };
                                        zIndex: {
                                            type: string;
                                        };
                                        color: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            uiSchema: {
                type: string;
                elements: ({
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                } | {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    }[];
                })[];
            };
        };
        theme: {
            dataSchema: {
                type: string;
                properties: {
                    darkShadow: {
                        type: string;
                    };
                    fontColor: {
                        type: string;
                        format: string;
                    };
                    backgroundColor: {
                        type: string;
                        format: string;
                    };
                    height: {
                        type: string;
                    };
                };
            };
        };
    };
    export function getEmbedderSchema(): {
        general: {
            dataSchema: {
                type: string;
                properties: {
                    title: {
                        type: string;
                        required: boolean;
                    };
                    description: {
                        type: string;
                    };
                    options: {
                        type: string;
                        title: string;
                        properties: {
                            xColumn: {
                                type: string;
                                title: string;
                                required: boolean;
                                properties: {
                                    key: {
                                        type: string;
                                        required: boolean;
                                    };
                                    type: {
                                        type: string;
                                        enum: string[];
                                        required: boolean;
                                    };
                                };
                            };
                            yColumns: {
                                type: string;
                                title: string;
                                required: boolean;
                                items: {
                                    type: string;
                                };
                            };
                            groupBy: {
                                type: string;
                            };
                            globalSeriesType: {
                                type: string;
                                enum: string[];
                                required: boolean;
                            };
                            smooth: {
                                type: string;
                            };
                            stacking: {
                                type: string;
                            };
                            legend: {
                                type: string;
                                properties: {
                                    show: {
                                        type: string;
                                    };
                                    scroll: {
                                        type: string;
                                    };
                                    position: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                            };
                            showSymbol: {
                                type: string;
                            };
                            showDataLabels: {
                                type: string;
                            };
                            percentage: {
                                type: string;
                            };
                            xAxis: {
                                type: string;
                                properties: {
                                    title: {
                                        type: string;
                                    };
                                    tickFormat: {
                                        type: string;
                                    };
                                    reverseValues: {
                                        type: string;
                                    };
                                };
                            };
                            leftYAxis: {
                                type: string;
                                properties: {
                                    title: {
                                        type: string;
                                    };
                                    tickFormat: {
                                        type: string;
                                    };
                                    labelFormat: {
                                        type: string;
                                    };
                                };
                            };
                            rightYAxis: {
                                type: string;
                                properties: {
                                    title: {
                                        type: string;
                                    };
                                    tickFormat: {
                                        type: string;
                                    };
                                    labelFormat: {
                                        type: string;
                                    };
                                };
                            };
                            seriesOptions: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        key: {
                                            type: string;
                                            required: boolean;
                                        };
                                        title: {
                                            type: string;
                                        };
                                        type: {
                                            type: string;
                                            enum: string[];
                                            required: boolean;
                                        };
                                        yAxis: {
                                            type: string;
                                            enum: string[];
                                            required: boolean;
                                        };
                                        zIndex: {
                                            type: string;
                                        };
                                        color: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        theme: {
            dataSchema: {
                type: string;
                properties: {
                    darkShadow: {
                        type: string;
                    };
                    fontColor: {
                        type: string;
                        format: string;
                    };
                    backgroundColor: {
                        type: string;
                        format: string;
                    };
                    height: {
                        type: string;
                    };
                };
            };
        };
    };
}
/// <amd-module name="@scom/scom-mixed-chart/dataOptionsForm.tsx" />
declare module "@scom/scom-mixed-chart/dataOptionsForm.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    interface IData {
        options: any;
    }
    interface ScomMixedChartDataOptionsFormElement extends ControlElement {
        dataSchema?: string;
        uiSchema?: string;
        options: any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-mixed-chart-data-options-form"]: ScomMixedChartDataOptionsFormElement;
            }
        }
    }
    export default class ScomMixedChartDataOptionsForm extends Module {
        private formEl;
        private _dataSchema;
        private _uiSchema;
        private _data;
        constructor(parent?: Container, options?: any);
        get data(): IData;
        set data(value: IData);
        refreshFormData(): Promise<IData>;
        private renderUI;
        private onInputChanged;
        onCustomInputChanged(data: IData): Promise<void>;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-mixed-chart" />
declare module "@scom/scom-mixed-chart" {
    import { Module, ControlElement, Container, IDataSchema, VStack } from '@ijstech/components';
    import { IMixedChartConfig } from "@scom/scom-mixed-chart/global/index.ts";
    interface ScomMixedChartElement extends ControlElement {
        lazyLoad?: boolean;
        data: IMixedChartConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-mixed-chart']: ScomMixedChartElement;
            }
        }
    }
    export default class ScomMixedChart extends Module {
        private chartContainer;
        private vStackInfo;
        private pnlChart;
        private loadingElm;
        private lbTitle;
        private lbDescription;
        private chartData;
        private _data;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        static create(options?: ScomMixedChartElement, parent?: Container): Promise<ScomMixedChart>;
        constructor(parent?: Container, options?: ScomMixedChartElement);
        private getData;
        private setData;
        private getTag;
        private setTag;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        elements?: undefined;
                    } | {
                        type: string;
                        elements: ({
                            type: string;
                            scope: string;
                            options?: undefined;
                        } | {
                            type: string;
                            scope: string;
                            options: {
                                detail: {
                                    type: string;
                                };
                            };
                        })[];
                        scope?: undefined;
                    })[];
                };
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema?: undefined;
                customUI?: undefined;
            })[];
            getData: any;
            setData: (data: IMixedChartConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        elements?: undefined;
                    } | {
                        type: string;
                        elements: ({
                            type: string;
                            scope: string;
                            options?: undefined;
                        } | {
                            type: string;
                            scope: string;
                            options: {
                                detail: {
                                    type: string;
                                };
                            };
                        })[];
                        scope?: undefined;
                    })[];
                };
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema?: undefined;
                customUI?: undefined;
            })[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        private updateStyle;
        private updateTheme;
        private onUpdateBlock;
        private updateChartData;
        private renderSnapshotData;
        private renderLiveData;
        private renderChart;
        private resizeChart;
        init(): Promise<void>;
        render(): any;
    }
}
