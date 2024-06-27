import cv2
import numpy as np
import sys
import os

def preprocess_image(img):
    img = cv2.GaussianBlur(img, (5, 5), 0)
    return img

def load_images_from_paths(paths):
    images = []
    for path in paths:
        img = cv2.imread(path)
        if img is not None:
            img = preprocess_image(img)
            images.append(img)
        else:
            print(f"Failed to load image: {path}")
    return images

def stitch_images(images):
    stitcher = cv2.Stitcher_create(cv2.Stitcher_PANORAMA)
    status, pano = stitcher.stitch(images)
    if status != cv2.Stitcher_OK:
        print(f"Error during stitching, status code: {status}")
        return None
    return pano

def enhance_panorama(pano):
    # Sharpen the image
    kernel = np.array([[0, -1, 0],
                       [-1, 5, -1],
                       [0, -1, 0]])
    pano = cv2.filter2D(pano, -1, kernel)
    pano = cv2.convertScaleAbs(pano, alpha=1.2, beta=20)

    # Convert to grayscale and threshold
    gray = cv2.cvtColor(pano, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 1, 255, cv2.THRESH_BINARY)

    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if contours:
        # Get the bounding box of the largest contour
        x, y, w, h = cv2.boundingRect(contours[0])
        pano = pano[y:y+h, x:x+w]

    return pano

def save_panorama(pano, output_path):
    pano = enhance_panorama(pano)
    cv2.imwrite(output_path, pano)
    print(f"Panorama saved to {output_path}")

if __name__ == "__main__":
    image_paths = sys.argv[1:]
    if len(image_paths) < 2:
        print("Need at least two images to stitch")
    else:
        images = load_images_from_paths(image_paths)
        panorama = stitch_images(images)
        if panorama is not None:
            output_path = os.path.join(os.path.dirname(image_paths[0]), 'stitched_panorama.jpg')
            save_panorama(panorama, output_path)
