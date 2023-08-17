import { Controller, Get, Res } from '@nestjs/common';
import { BranchService } from './branch.service';
import { Response } from 'express';

@Controller('branch')
export class BranchController {
  constructor(public branchService: BranchService) {}
  @Get()
  getAllBranch(@Res() res: Response) {
    return this.branchService.getAllBranch(res);
  }
}
