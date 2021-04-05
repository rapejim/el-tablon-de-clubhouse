import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  ngOnInit() {
    let prevScrollpos = document.getElementById('mainContainer').scrollTop;
    let upScrolling = 0;

    document.getElementById('mainContainer').onscroll = () => {
      const currentScrollPos = document.getElementById('mainContainer').scrollTop;

      if (prevScrollpos > currentScrollPos) {
        upScrolling += 1;
      } else if (currentScrollPos > 60) {
        document.getElementById('sticky-navbar').classList.add('d-none');
      }

      if (upScrolling > 12 || currentScrollPos === 0) {
        document.getElementById('sticky-navbar').classList.remove('d-none');
        upScrolling = 0;
      }

      prevScrollpos = currentScrollPos;
    };
  }

}
