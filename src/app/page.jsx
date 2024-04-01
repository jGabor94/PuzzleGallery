import { Stack, Typography } from "@mui/material";
import ImageGrid from "@/components/imageGrid/ImageGrid";
import PageSelector from "@/components/PageSelector";
import { SWRProvider } from "./_providers/providers";
import { unstable_serialize } from "swr";
import { toPlainObject } from "@/lib/assets/assets";
import SA_GetImages from "@/lib/actions/image/getImages";
import SA_GetImageNumber from "@/lib/actions/image/getImageNumber";
import HideImageIcon from '@mui/icons-material/HideImage';

export default async function Home() {

  const { payload: images } = await SA_GetImages(1)
  const { payload: imageNumber } = await SA_GetImageNumber()

  return images.length > 0 ? (
    <Stack sx={{ width: "100%" }} alignItems="center" gap={2} pb={2}>
      <PageSelector {...{ imageNumber }} />
      <SWRProvider value={{ fallback: { [unstable_serialize(['imageList', 1])]: toPlainObject([...images]) } }}>
        <ImageGrid />
      </SWRProvider>
      <PageSelector {...{ imageNumber }} />
    </Stack>

  ) : (
    <Stack gap={1} alignItems="center" justifyContent="center" sx={{ height: 700 }}>
      <HideImageIcon sx={{ width: 100, height: 100, color: "text.secondary" }} />
      < Typography sx={{ fontSize: 17 }
      }> Jelenleg egyetlen kép sincs feltöltve</Typography >
    </Stack >

  )
}
