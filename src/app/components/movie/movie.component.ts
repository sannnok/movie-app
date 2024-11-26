import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SafeLinkPipe } from '../../pipes/safe-link.pipe';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SafeLinkPipe],
})
export class MovieComponent {
  @Input() movie!: { title: string; overview: string; poster_path: string; };
}
