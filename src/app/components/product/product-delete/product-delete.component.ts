import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product | undefined;
  private id = this.route.snapshot.paramMap.get('id');

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productService.readById(this.id!).subscribe( product => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    this.productService.delete(this.id!).subscribe(() => {
      this.productService.showMessage("Produto deletado!");
      this.router.navigate(['/products']);
    });
  }

  cancelProduct(): void {
    this.router.navigate(['/products']);
  }
}
