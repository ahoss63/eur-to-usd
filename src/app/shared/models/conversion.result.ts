import { SwitchType } from './switch.type.enum';

export interface ConversionResult {
  montant: number;
  from: SwitchType;
  to: SwitchType;
  result: number;
  taux: number;
}
