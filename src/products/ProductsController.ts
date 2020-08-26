/**
 * Pharmacy 4U (core) - Online pharmacy for you
 * Copyright (C) 2020 Stan Vlad <vstan02@protonmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { Collection, Database } from '../database';
import { Controller } from '../controllers';

import Product from './Product';

class ProductsController extends Controller<Product> {
	private $products: Collection<Product>;

	public constructor(database: Database) {
		super();
		this.$products = database.products;
	}

	public async get(id: string): Promise<Product> {
		return this.$products.get(id);
	}

	public async getBy(data: object): Promise<Product> {
		return this.$products.getBy(data);
	}

	public async getAll(): Promise<Array<Product>> {
		return this.$products.getAll();
	}

	public async create(product: Product): Promise<string> {
		return this.$products.create(product);
	}

	public async update(id: string, data: Product): Promise<void> {
		const { name, description, link } = data;

		return this.$products.update(id, Object.assign({},
			name ? { name } : undefined,
			description ? { description } : undefined,
			link ? { link } : undefined
		));
	}

	public async delete(id: string): Promise<void> {
		return this.$products.delete(id);
	}

	public async compare(id: string, entity: Product): Promise<boolean> {
		const { name, description, link } = entity;
		const product = await this.$products.get(id);

		return (
			name == product.name
			&& description == product.description
			&& link == product.link
		);
	}
}

export default ProductsController;
