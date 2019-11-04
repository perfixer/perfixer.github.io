  
        
        hljs.initHighlightingOnLoad();
        function changepre(){
            
            var prefix = '#staticpage';            
            var blues = $('.cssorg').val();
            
            prefixCssSelectors(blues , prefix);
        }
        
        var prefixCssSelectors = function(rules, className) {
            var classLen = className.length,
            char, nextChar, isAt, isIn;
            
            // makes sure the className will not concatenate the selector
            className += ' ';
            
            // removes comments
            rules = rules.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
            
            // makes sure nextChar will not target a space
            rules = rules.replace( /}(\s*)@/g, '}@' );
            rules = rules.replace( /}(\s*)}/g, '}}' );
            
            for (var i = 0; i < rules.length-2; i++) {
                char = rules[i];
                nextChar = rules[i+1];
                
                if (char === '@') isAt = true;
                if (!isAt && char === '{') isIn = true;
                if (isIn && char === '}') isIn = false;
                
                if (
                !isIn &&
                nextChar !== '@' &&
                nextChar !== '}' &&
                (
                char === '}' ||
                char === ',' ||
                ((char === '{' || char === ';') && isAt)
                )
                ) {
                    rules = rules.slice(0, i+1) + className + rules.slice(i+1);
                    i += classLen;
                    isAt = false;
                }
            };
            
            // prefix the first select if it is not `@media` and if it is not yet prefixed
            if (rules.indexOf(className) !== 0 && rules.indexOf('@') !== 0) rules = className+rules;
            var beautified = cssbeautify(rules, {
                indent: '  ',
                openbrace: 'separate-line',
                autosemicolon: true
            });
            // $(".cssdisplay > pre > code").html('');
            $(".cssdisplay").val(beautified);
        }