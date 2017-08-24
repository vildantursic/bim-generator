import { Injectable } from '@angular/core';

@Injectable()
export default class Helper {

  filterCheckoutsFromProjectData(projects: any): any {
    let checkouts = [];

    projects.forEach(project => {
      project.checkout.forEach(checkout => {
        checkout.name = `${project.name} | ${checkout.name}`
        checkouts.push(checkout);
      })
    })

    return checkouts;
  }
}
