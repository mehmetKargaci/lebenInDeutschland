import {Component, inject} from '@angular/core';
import {RavDataService} from "../../core/services/rav-data.service";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  ravDataService = inject(RavDataService);

}
