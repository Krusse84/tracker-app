import { Component, NgZone, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import {
  StripeElementsOptions,
  Appearance
} from '@stripe/stripe-js';
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent
} from 'ngx-stripe';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { environment } from '../../environments/environment.dev';
import { AuthService } from '../../services/oldauth.service';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss'],
  imports: [
    AsyncPipe, 
    MatCardModule, 
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatChipsModule,
    MatRadioModule,
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class StripeComponent implements OnInit {

  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  @ViewChild(StripeElementsDirective)

  private readonly fb = inject(UntypedFormBuilder);
  private user;
  private senderPrice: number = 499;
  private servicePrice: number = 49;
  stripeStatus: string; 

  checkoutForm = this.fb.group({
    name: [{ value: '', disabled: true }, [Validators.required]],
    email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
    city: ['', [Validators.required]],
    amount: [2500, [Validators.required, Validators.pattern(/\d+/)]],
    cloudServices: [true],
    senderUnit: [true]
  });

  appearance: Appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
      colorPrimary: '#673ab7',
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'sv',
    mode: 'subscription',
    appearance: {
      theme: 'stripe',
    },
    amount: 2500,
    currency: 'sek'
  };

  stripe = injectStripe(environment.stripe.publicKey);

  constructor(
    public ngZone: NgZone,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private afFun: AngularFireFunctions
  ) {

    this.user = this.authService.googleUser;

    this.stripeStatus = '';
  }

  protected destroyed = new Subject<void>();

  onPay() {

  }

  paying = new BehaviorSubject<boolean>(false);

  get amount() {

    let sum = 0;

    if (this.checkoutForm.value.senderUnit == true) {
      sum = sum + this.senderPrice;
    }

    if (this.checkoutForm.value.cloudServices == true) {
      sum = sum + this.servicePrice;
    }

    return sum;
  }


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit(): void {
    this.checkoutForm.patchValue({
      name: this.user.name,
      email: this.user.email,
    });

    //this.stripeStatus = this.getStripeStatus();   
  }

  onCancel() {
    this.ngZone.run(() => {
      this.router.navigate(['sign-in']);
    });
  }

  clear() {
    this.checkoutForm.patchValue({
      address: '',
      zipcode: '',
      city: '',
    });
  }

  getStripeStatus(): string {
    let action = this.activatedRoute.snapshot.queryParamMap.get('action');              // ex: '/home?action=success'
    console.log('action = ', action);
    if (action && action == 'cancel' || action == 'success')
      return action;
    return '';
  }

  checkoutFirebase(priceId: string): void {
    console.log(`checking out with item id: ${priceId} for ${this.user.email}`);

    this.afFun.httpsCallable('stripeCheckoutWithoutDbQueries')(
      {
        priceId: priceId, 
        email: this.user.email,
        uid: this.user.uid
      }
    )
      .subscribe(result => {
        console.log({ result });

        /*
        this.stripe.redirectToCheckout({
          sessionId: result,
        }).pipe(takeUntil(this.destroyed)).subscribe(() => {
        })*/
      });
  }

}
