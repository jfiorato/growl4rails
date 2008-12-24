module ActionView::Helpers
  module Growl4RailsHelper
    
    # Add this to your layout
    # <%= growl4rails_includes %>
    def growl4rails_includes()
      javascript_include_tag("#{asset_path}growl4rails.js") + "\n" +
      stylesheet_link_tag("#{asset_path}growl4rails.css")
    end
    
    def asset_path
      "growl4rails/"
    end
  end
end