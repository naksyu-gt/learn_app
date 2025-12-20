export interface DbHealth {
    isUp(): Promise<boolean>;
}