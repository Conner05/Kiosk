import { Component, Inject, Input, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

export class Contact {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})

export class ContactComponent implements OnInit {

  @Input() subject: string;

  private baseUrl: string = '';
  public contact: Contact = new Contact();
  public message: string = '';
  public success: boolean = false;
  public error: boolean = false;
  public submitted: boolean = false;
  private alertTimeout = 8000;

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.contact.subject = this.subject;
  }

  ngOnInit() {
    this.success = false;
    this.error = false;
  }

  submit() {
    let body = JSON.stringify(this.contact);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `${this.baseUrl}api/contact`;
    this.submitted = true;
    this.http.post(url, body, options).subscribe((result: any) => {
      this.message = result['_body'].toString();
      console.log(this.message);
      this.success = true;
      this.submitted = false;
      this.clearFields();
      this.clearAlert();
    }, error => {
      this.message = error.toString();
      this.error = true;
      this.submitted = false;
      this.clearFields();
      this.clearAlert();
    });
  }

  clearFields() {
    this.contact.email = '';
    this.contact.message = '';
    this.contact.name = '';
  }
  clearAlert() {
    setTimeout(() => {
      this.error = false;
      this.success = false;
    }, this.alertTimeout);
  }
}