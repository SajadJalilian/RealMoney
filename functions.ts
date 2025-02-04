export async function fetchData(location: string): Promise<any> {
    const response = await fetch(location);
    if (!response.ok) {
        console.log("Failed to read data");
    }
    const data = await response.json();
    return data;
};

export function readInputById(inputId: string): string {
    let inputElement;
    inputElement = document.getElementById(inputId) as HTMLInputElement;
    return inputElement.value;
}

export function setSpanInputById(inputId: string, spanTextContent: string) {
    let element;
    element = document.getElementById(inputId) as HTMLSpanElement;
    element.innerText = spanTextContent;
}

export class Result<T> {
    public isSuccess: boolean;
    public error?: string;
    public value?: T;

    private constructor(isSuccess: boolean, error?: string, value?: T) {
        this.isSuccess = isSuccess;
        this.error = error;
        this.value = value;
    }

    public static success<T>(value: T): Result<T> {
        return new Result<T>(true, undefined, value);
    }

    public static failure<T>(error: string): Result<T> {
        return new Result<T>(false, error);
    }
}

