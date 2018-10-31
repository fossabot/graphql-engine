{-# OPTIONS_GHC -fno-warn-orphans #-}

module Network.URI.Extended
  (module Network.URI
  )
  where

import           Data.Aeson
import           Hasura.Prelude
import           Language.Haskell.TH.Syntax (Lift)
import           Network.URI

import qualified Data.Text                  as T

instance {-# INCOHERENT #-} FromJSON URI where
  parseJSON (String uri) = do
    let mUrl = parseURI $ T.unpack uri
    maybe (fail "not a valid URI") return mUrl
  parseJSON _ = fail "not a valid URI"

instance {-# INCOHERENT #-} ToJSON URI where
  toJSON = String . T.pack . show

instance Lift URI
