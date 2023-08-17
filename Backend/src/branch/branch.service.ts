import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './branch.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}
  async getAllBranch(res) {
    try {
      const branch = await this.branchRepository.find();
      return res.status(200).json({
        branch,
      });
    } catch (error) {}
  }
}
