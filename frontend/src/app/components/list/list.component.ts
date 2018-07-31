import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Issue } from '../../interfaces';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  columns = ['Title', 'Responsible', 'Description', 'Severity', 'Status', 'Actions'];

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {
    this.fetchIssues();
  }

  // Fetches all documents.
  fetchIssues() {
    this.issueService
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('Data Requested');
        console.log(this.issues);
      });
  }

  // Redirects to the /edit route.
  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  // Deletes the selected issue and refreshes the document view.
  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }
}
