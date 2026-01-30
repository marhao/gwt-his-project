import type { HttpContext } from '@adonisjs/core/http'
import PatientImage from '#models/patient_image'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

export default class PatientImagesController {
  /**
   * @getImage
   * @summary Get patient profile image
   * @paramPath hn - Patient HN
   * @responseBody 200 - Returns image as base64 or binary
   * @responseBody 404 - Image not found
   */
  async getImage({ params, response }: HttpContext) {
    try {
      const { hn } = params

      // Get profile image (image_name = 'profile' or first image)
      const image = await PatientImage.query()
        .where('hn', hn)
        .where('image_name', 'profile')
        .first()

      if (!image || !image.image) {
        // Try to get any image for this patient
        const anyImage = await PatientImage.query()
          .where('hn', hn)
          .whereNotNull('image')
          .first()

        if (!anyImage || !anyImage.image) {
          return response.notFound({
            success: false,
            message: 'Patient image not found',
          })
        }

        // Return as base64
        const base64 = anyImage.image.toString('base64')
        return response.ok({
          success: true,
          data: {
            hn: anyImage.hn,
            image_name: anyImage.imageName,
            image: `data:image/jpeg;base64,${base64}`,
            width: anyImage.width,
            height: anyImage.height,
            capture_date: anyImage.captureDate?.toISO(),
          },
        })
      }

      // Return as base64
      const base64 = image.image.toString('base64')
      return response.ok({
        success: true,
        data: {
          hn: image.hn,
          image_name: image.imageName,
          image: `data:image/jpeg;base64,${base64}`,
          width: image.width,
          height: image.height,
          capture_date: image.captureDate?.toISO(),
        },
      })
    } catch (error) {
      console.error('Error fetching patient image:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch patient image',
        error: error.message,
      })
    }
  }

  /**
   * @getImageRaw
   * @summary Get patient image as raw binary (for img src)
   * @paramPath hn - Patient HN
   * @responseBody 200 - Returns image binary
   */
  async getImageRaw({ params, response }: HttpContext) {
    try {
      const { hn } = params

      const image = await PatientImage.query()
        .where('hn', hn)
        .where('image_name', 'profile')
        .first()

      if (!image || !image.image) {
        // Return default placeholder
        return response.redirect('/images/default-avatar.png')
      }

      response.header('Content-Type', 'image/jpeg')
      response.header('Cache-Control', 'public, max-age=3600')
      return response.send(image.image)
    } catch (error) {
      console.error('Error fetching patient image:', error)
      return response.redirect('/images/default-avatar.png')
    }
  }

  /**
   * @uploadImage
   * @summary Upload patient profile image
   * @paramPath hn - Patient HN
   * @requestBody <uploadImageBody>
   * @responseBody 200 - Image uploaded successfully
   */
  async uploadImage({ params, request, response }: HttpContext) {
    try {
      const { hn } = params
      const body = request.body()

      // Expect base64 image data
      const { image, width, height } = body

      if (!image) {
        return response.badRequest({
          success: false,
          message: 'Image data is required',
        })
      }

      // Remove data URL prefix if present
      let imageData = image
      if (image.startsWith('data:')) {
        imageData = image.split(',')[1]
      }

      // Convert base64 to buffer
      const imageBuffer = Buffer.from(imageData, 'base64')

      // Check if profile image exists
      const existingImage = await PatientImage.query()
        .where('hn', hn)
        .where('image_name', 'profile')
        .first()

      if (existingImage) {
        // Update existing
        existingImage.image = imageBuffer
        existingImage.width = width || null
        existingImage.height = height || null
        existingImage.captureDate = DateTime.now()
        await existingImage.save()
      } else {
        // Create new
        await PatientImage.create({
          hn,
          imageName: 'profile',
          image: imageBuffer,
          width: width || null,
          height: height || null,
          captureDate: DateTime.now(),
          hosGuid: randomUUID(),
        })
      }

      return response.ok({
        success: true,
        message: 'Image uploaded successfully',
      })
    } catch (error) {
      console.error('Error uploading patient image:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to upload patient image',
        error: error.message,
      })
    }
  }

  /**
   * @deleteImage
   * @summary Delete patient profile image
   * @paramPath hn - Patient HN
   * @responseBody 200 - Image deleted successfully
   */
  async deleteImage({ params, response }: HttpContext) {
    try {
      const { hn } = params

      await PatientImage.query()
        .where('hn', hn)
        .where('image_name', 'profile')
        .delete()

      return response.ok({
        success: true,
        message: 'Image deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting patient image:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to delete patient image',
        error: error.message,
      })
    }
  }

  /**
   * @getAllImages
   * @summary Get all images for a patient
   * @paramPath hn - Patient HN
   * @responseBody 200 - Returns list of images
   */
  async getAllImages({ params, response }: HttpContext) {
    try {
      const { hn } = params

      const images = await PatientImage.query()
        .where('hn', hn)
        .select(['hn', 'image_name', 'width', 'height', 'capture_date'])
        .orderBy('capture_date', 'desc')

      return response.ok({
        success: true,
        data: images.map((img) => ({
          hn: img.hn,
          image_name: img.imageName,
          width: img.width,
          height: img.height,
          capture_date: img.captureDate?.toISO(),
        })),
      })
    } catch (error) {
      console.error('Error fetching patient images:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch patient images',
        error: error.message,
      })
    }
  }
}
