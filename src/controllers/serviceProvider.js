import express from express;
import ServiceProvider from '../models/serviceProvider.js';
import UPID from '../models/UPID.js';
import { accessToken2 } from '../lib/accessToken.js';
import { refreshToken2 } from '../lib/refershToken.js';

const createProvider = async (req, res) => {
  try {
    const { providerName, providerType, providerEmail, providerPhone } = req.body;
    if (!providerName || !providerType || !providerEmail || !providerPhone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    const existingProvider = await ServiceProvider.findOne({ providerEmail: providerEmail, providerPhone: providerPhone, providerName: providerName });

    if (existingProvider) {
      return res.status(400).json({
        success: false,
        message: 'Provider already exists'
      })
    }

    const newProvider = new ServiceProvider.create({
      providerName,
      providerType,
      providerEmail,
      providerPhone
    })

    await newProvider.save();
    const accessToken = await accessToken2(newProvider);
    const refreshToken = await refreshToken2(newProvider);

    return res.status(201).json({
      success: true,
      message: 'Provider created successfully',
      data: newProvider,
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false
    })
  }
}


const generateUPIService = async (req, res) => {
  try {
    const serviceProviderName = req.userInfo.serviceProviderNameFromAccessToken;
    const serviceProviderEmail = req.userInfo.serviceProviderEmailFromAccessToken;
    const serviceProviderPhone = req.userInfo.serviceProviderPhoneFromAccessToken;


    const upiId = serviceProviderName + serviceProviderPhone + '@' + 'upay';

    const newUPI = new UPID.create({
      _id: req.userInfo._id,
      upiId: upiId
    });
    await newUPI.save();

    const provider = await ServiceProvider.findById(req.userInfo._id);
    provider.providerUpiID = upiId;
    await provider.save();

    return res.status(201).json({
      success: true,
      message: 'UPI ID generated successfully',
      data: newUPI
    })

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false
    })
  }
}

export {
  createProvider,
  generateUPIService
}