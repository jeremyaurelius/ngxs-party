import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PartyState } from 'src/app/state/party.state';
import { Adventurer } from 'src/app/models/adventurer/adventurer.type';
import { Observable } from 'rxjs';
import { UpdateAdventurer, DeleteAdventurer, CreateAdventurer } from 'src/app/actions/party.actions';
import { AdventurerClassState } from 'src/app/state/adventurer-class.state';
import { AdventurerClass } from 'src/app/models/adventurer-class/adventurer-class.type';
import { Dictionary } from 'src/app/utils/dictionary.type';

@Component({
  selector: 'app-party-management-page',
  templateUrl: './party-management-page.component.html',
  styleUrls: ['./party-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyManagementPageComponent implements OnInit {

  @Select(PartyState.getAdventurers) adventurers$: Observable<Adventurer[]>;
  @Select(AdventurerClassState.getClasses) adventurerClasses$: Observable<AdventurerClass[]>;
  @Select(AdventurerClassState.getClassDict) classDict$: Observable<Dictionary<AdventurerClass>>;

  constructor(private store: Store) {
    // console.log('adventurers$', this.store.select(state => state.party.adventurers));
  }

  ngOnInit() {
  }

  levelUp(adventurer: Adventurer) {
    this.store.dispatch(new UpdateAdventurer({
      ...adventurer,
      level: adventurer.level + 1,
    }));
  }

  deleteAdventurer(adventurer: Adventurer) {
    this.store.dispatch(new DeleteAdventurer(adventurer));
  }

  createAdventurer(adventurer: Adventurer) {
    this.store.dispatch(new CreateAdventurer(adventurer));
  }

}
