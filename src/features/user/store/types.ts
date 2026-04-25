export interface InputConfig {
  keyboardHeight: number;
}

export interface SetInputConfigPayload {
  key: keyof InputConfig;
  value: InputConfig[keyof InputConfig];
}

export interface UserState {
  inputConfig: InputConfig;
}
