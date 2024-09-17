import { NextFunction, Response } from 'express';

export const identifyDevice = (req: any, res: Response, next: NextFunction) => {
  if (!req.session.deviceType) {
    const isMobile = req.useragent.isMobile;
    const isTablet = req.useragent.isTablet;

    req.session.deviceType = isMobile
      ? 'Mobile'
      : isTablet
        ? 'Tablet'
        : 'Desktop';
  }
  next();
};
