import express from 'express';
import ServiceProvider from '../models/ServiceProvider.js';
import UPID from '../models/Upid.js';
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

    const newProvider = await ServiceProvider.create({
      providerName: providerName,
      providerType: providerType,
      providerEmail: providerEmail,
      providerPhone: providerPhone
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
    const serviceProviderId = req.userInfo._id;

    const serviceProvider = await ServiceProvider.findById(serviceProviderId);
    if (!serviceProvider) {
      return res.status(404).json({
        success: false,
        message: 'Service provider not found'
      })
    }

    const serviceProviderName = serviceProvider.providerName;
    const serviceProviderPhone = serviceProvider.providerPhone;


    const upiId = serviceProviderName + serviceProviderPhone + '@' + 'upay';

    const newUPI = await UPID.create({
      userId: serviceProviderId,
      upidId: upiId
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
      message: error.message,
      success: false
    })
  }
}

export {
  createProvider,
  generateUPIService
}