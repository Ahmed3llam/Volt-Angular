import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAllBranch, Branch } from '../Models/branch'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private baseUrl = 'http://localhost:5247/api/Branch'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  getBranches(): Observable<getAllBranch[]> {
    return this.http
      .get<{ $id: string; $values: getAllBranch[] }>(this.baseUrl)
      .pipe(
        map((response) => response.$values) // Extract the values array
      );
  }
  getBranchById(id: number): Observable<getAllBranch> {
    return this.http.get<getAllBranch>(`${this.baseUrl}/${id}`);
  }
  updateBranchById(id: number, branch: Branch): Observable<Branch> {
    return this.http.put<Branch>(`${this.baseUrl}/${id}`, branch);
  }

  addBranch(branch: any): Observable<any> {
    return this.http.post(this.baseUrl, branch);
  }
  deleteBranch(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
