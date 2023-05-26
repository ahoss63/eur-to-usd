import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subject, combineLatest, map, scan, tap } from 'rxjs';
import { ConversionResult } from 'src/app/shared/models/conversion.result';
import { SwitchType } from 'src/app/shared/models/switch.type.enum';
import { TauxService } from 'src/app/shared/services/taux.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  taux$!: Observable<number>;
  maxVariation = 2;
  result$!: Observable<ConversionResult>;
  historySubject$ = new Subject<ConversionResult>();
  history$!: Observable<ConversionResult[]>;

  form = this.fb.nonNullable.group({
    montant: new FormControl(0, {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    switch: [SwitchType.EUR],
    tauxPersonalise: new FormControl(0, {
      updateOn: 'blur',
    }),
  });
  constructor(private tauxService: TauxService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.taux$ = this.tauxService.getTaux(1.1, 3000);
    this.result$ = combineLatest([this.taux$, this.form.valueChanges]).pipe(
      map(([tauxReel, formValue]) => {
        console.log(tauxReel, formValue);
        const montant = formValue?.montant || 0;
        const tauxPersonalise = formValue?.tauxPersonalise || 0;
        const switchValue = formValue.switch || SwitchType.USD;
        const percVariation = ((tauxPersonalise - tauxReel) * 100) / tauxReel;
        console.log('Taux personalisé', percVariation);
        const taux =
          percVariation > this.maxVariation || percVariation <= 0
            ? tauxReel
            : tauxPersonalise;
        const result =
          switchValue === SwitchType.EUR ? taux * montant : montant / taux;
        const convRes = {
          montant,
          from: switchValue,
          to: switchValue === SwitchType.EUR ? SwitchType.USD : SwitchType.EUR,
          result,
          taux,
        };
        console.log(convRes);
        return convRes;
      }),
      tap((res) => {
        this.historySubject$.next(res);
      })
    );
    this.history$ = this.historySubject$.pipe(
      scan((acc: ConversionResult[], val) => {
        acc.push(val);
        return acc.slice(-5);
      }, [])
    );
  }
}
