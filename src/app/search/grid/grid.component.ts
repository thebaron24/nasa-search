import { Component, Input, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, switchMap } from "rxjs/operators";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnDestroy {

  subscriptions: any = {}

  @Input() data: any = {};
  @Input() show: Boolean = true;

  state = {
    columns: 4,
    gutter: 1,
    gutterUnit: 'px',
    rowHeight: 200,
    rowUnit: 'px',
    colspan: 1,
    rowspan: 1
  };

  viewportSizes = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
    Breakpoints.Web,
    Breakpoints.WebLandscape,
    Breakpoints.WebPortrait,
    Breakpoints.Handset,
    Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait,
    Breakpoints.Tablet,
    Breakpoints.TabletLandscape,
    Breakpoints.TabletPortrait
  ];

  widthChange$: Observable<BreakpointState> = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ]).pipe(
    map((state: BreakpointState) => state)
  );

  constructor(
    public breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    public loading: LoadingService
  ) {
    this.subscriptions.widthChange = this.widthChange$.subscribe((state: BreakpointState) => {
      if(state.matches) {
        console.info("layout state", state.breakpoints);
        if(state.breakpoints[Breakpoints.XSmall]) this.state.columns = 1, this.state.rowHeight = 400;
        if(state.breakpoints[Breakpoints.Small]) this.state.columns = 2, this.state.rowHeight = 200;
        if(state.breakpoints[Breakpoints.Medium]) this.state.columns = 3, this.state.rowHeight = 200;
        if(state.breakpoints[Breakpoints.Large]) this.state.columns = 4, this.state.rowHeight = 200;
        if(state.breakpoints[Breakpoints.XLarge]) this.state.columns = 5, this.state.rowHeight = 200;
      }
    })
  }

  ngOnDestroy() {
    Object.keys(this.subscriptions).forEach(key => this.subscriptions[key].unsubscribe());
  }

  toggleFullscreen(event) {
    console.log(event);
  }

  //{ panelClass: 'should be same as ' }
  openDialog(item): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      // width: '100%',
      data: { item },
      panelClass: 'angular-universal-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
