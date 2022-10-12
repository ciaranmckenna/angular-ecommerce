import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;

  // dependency injected 
  constructor(private productService: ProductService, 
              private route: ActivatedRoute) { }

  ngOnInit() { 
    this.route.paramMap.subscribe(() => {
      this.listPrducts();
    });
  }

  listPrducts() {
    // check if "id" parameter is available 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      // no category id available ... default to category id 1
      this.currentCategoryId =1;
    }

    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
    data => {
      this.products = data;

    }
    )
  }

}
