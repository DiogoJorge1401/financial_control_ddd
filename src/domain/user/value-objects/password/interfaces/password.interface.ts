export interface IPassword {
  encryptPassword(): Promise<void>;
  compare(candidate: string): Promise<boolean>
}