import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Nft } from '../../../models/nft';

@Component({
  selector: '[nft-dual-card]',
  templateUrl: './nft-dual-card.component.html',
})
export class NftDualCardComponent implements OnInit {
  @Input() displayLabel: string = <string>"";
  @Input() upcomingCount:number =<number> 3;
  constructor() {}

  ngOnInit(): void {}
}
